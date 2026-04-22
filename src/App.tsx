import { useCallback, useEffect, useState } from "react";
import InfiniteMenu from "./components/InfiniteMenu";

type MenuItem = {
  image: string;
  link: string;
  title: string;
  description: string;
  userDetails: {
    gender: string;
    email: string;
    phone: string;
    cell: string;
    nationality: string;
    age: number;
    birthDate: string;
    registeredDate: string;
    username: string;
    uuid: string;
    idName: string;
    idValue: string | null;
    location: {
      street: string;
      city: string;
      state: string;
      country: string;
      postcode: number | string;
      latitude: string;
      longitude: string;
      timezoneOffset: string;
      timezoneDescription: string;
    };
  };
};

type RandomUser = {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number | string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string | null;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
};

type RandomUserInfo = {
  seed: string;
  results: number;
  page: number;
  version: string;
};

type RandomUserResponse = {
  results: RandomUser[];
  info: RandomUserInfo;
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
      const response = await fetch("https://randomuser.me/api/?results=10");
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const data = (await response.json()) as RandomUserResponse;
      const mappedItems = (data.results ?? [])
        .map((user, index) => {
          const image = user.picture?.large?.trim() ?? "";
          const firstName = user.name?.first?.trim() ?? "";
          const lastName = user.name?.last?.trim() ?? "";
          const city = user.location?.city?.trim() ?? "Unknown city";
          const state = user.location?.state?.trim() ?? "Unknown state";
          const country = user.location?.country?.trim() ?? "Unknown country";
          const age = user.dob?.age ?? "unknown";
          const nationality = user.nat?.trim() || "N/A";
          const username = user.login?.username?.trim() || "anonymous";
          const fullName = [firstName, lastName].filter(Boolean).join("\n");
          const description = `Hi, I'm from ${city}, ${state}, ${country}. I'm ${age} years old, my nationality is ${nationality}, and my username is @${username}.`;

          if (!image) {
            return null;
          }

          return {
            image: toCorsSafeImageUrl(image),
            link: "https://randomuser.me/",
            title: fullName || `User ${index + 1}`,
            description,
            userDetails: {
              gender: user.gender,
              email: user.email,
              phone: user.phone,
              cell: user.cell,
              nationality: user.nat,
              age: user.dob.age,
              birthDate: user.dob.date,
              registeredDate: user.registered.date,
              username: user.login.username,
              uuid: user.login.uuid,
              idName: user.id.name,
              idValue: user.id.value,
              location: {
                street: `${user.location.street.number} ${user.location.street.name}`,
                city: user.location.city,
                state: user.location.state,
                country: user.location.country,
                postcode: user.location.postcode,
                latitude: user.location.coordinates.latitude,
                longitude: user.location.coordinates.longitude,
                timezoneOffset: user.location.timezone.offset,
                timezoneDescription: user.location.timezone.description,
              },
            },
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
      <InfiniteMenu items={items} scale={1} />
    </div>
  );
};

export default App;
