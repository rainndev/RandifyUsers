import { useCallback, useEffect, useState } from "react";
import InfiniteMenu from "./components/InfiniteMenu";

type MenuItem = {
  image: string;
  link: string;
  title: string;
  description: string;
};

type RandomUserResponse = {
  results?: Array<{
    name?: {
      first?: string;
      last?: string;
    };
    picture?: {
      large?: string;
    };
  }>;
};

const toCorsSafeImageUrl = (rawUrl: string) => {
  const withoutProtocol = rawUrl.replace(/^https?:\/\//, "");
  return `https://images.weserv.nl/?url=${encodeURIComponent(withoutProtocol)}&w=768&h=768&fit=cover`;
};

const App = () => {
  const [items, setItems] = useState<MenuItem[]>([]);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(
        "https://randomuser.me/api/?results=10&inc=name,picture&noinfo",
      );
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const data = (await response.json()) as RandomUserResponse;
      const mappedItems = (data.results ?? [])
        .map((user, index) => {
          const image = user.picture?.large?.trim() ?? "";
          const fullName = `${user.name?.first ?? ""} ${user.name?.last ?? ""}`
            .trim()
            .replace(/\s+/g, " ");

          if (!image) {
            return null;
          }

          return {
            image: toCorsSafeImageUrl(image),
            link: "https://randomuser.me/",
            title: fullName || `User ${index + 1}`,
            description: "Random User API profile",
          };
        })
        .filter((item): item is MenuItem => Boolean(item));

      setItems(mappedItems);
    } catch (error) {
      console.error("Failed to fetch random users:", error);
      setItems([]);
    }
  }, []);

  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      <InfiniteMenu items={items} scale={10} />
    </div>
  );
};

export default App;
