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
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
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
          const firstName = user.name?.first?.trim() ?? "";
          const lastName = user.name?.last?.trim() ?? "";
          const fullName = [firstName, lastName].filter(Boolean).join("\n");

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
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <button
        type="button"
        onClick={() => void fetchUsers()}
        disabled={isLoading}
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          zIndex: 20,
          padding: "10px 14px",
          borderRadius: "10px",
          border: "1px solid rgba(255,255,255,0.35)",
          background: "rgba(0,0,0,0.45)",
          color: "#fff",
          fontWeight: 600,
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
      >
        {isLoading ? "Regenerating..." : "Regenerate"}
      </button>
      <InfiniteMenu items={items} scale={2} />
    </div>
  );
};

export default App;
