import { RefreshCcw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import ErrorUI from "./components/Error";
import InfiniteMenu from "./components/InfiniteMenu";
import Loading from "./components/Loading";
import type { MenuItem, RandomUserResponse } from "./types/User.types";
import { toCorsSafeImageUrl } from "./utils/Cors";

type GenderFilter = "all" | "male" | "female";

const App = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<GenderFilter>("all");

  const fetchUsers = useCallback(async (gender: GenderFilter = "all") => {
    setIsLoading(true);
    setError(null);
    setSelectedGender(gender);
    try {
      let url = "https://randomuser.me/api/?results=10";
      if (gender !== "all") {
        url += `&gender=${gender}`;
      }
      const response = await fetch(url);
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
      setError(error instanceof Error ? error.message : String(error));
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
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorUI message={error} />
      ) : (
        <>
          <div className="absolute top-4 right-4 z-20 flex gap-3 items-center">
            <div className="flex gap-2 rounded-xl border-[5px] border-[#1a1a1a] bg-[rgba(0,0,0,0.45)] p-1.5 backdrop-blur-sm">
              <button
                type="button"
                onClick={() => void fetchUsers("all")}
                disabled={isLoading}
                className={`px-4 py-1.5 rounded-lg font-semibold text-sm transition-all disabled:cursor-not-allowed ${
                  selectedGender === "all"
                    ? "bg-amber-300 text-[#212121]"
                    : "bg-transparent text-white/70 hover:text-white"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => void fetchUsers("male")}
                disabled={isLoading}
                className={`px-4 py-1.5 rounded-lg font-semibold text-sm transition-all disabled:cursor-not-allowed ${
                  selectedGender === "male"
                    ? "bg-amber-300 text-[#212121]"
                    : "bg-transparent text-white/70 hover:text-white"
                }`}
              >
                Male
              </button>
              <button
                type="button"
                onClick={() => void fetchUsers("female")}
                disabled={isLoading}
                className={`px-4 py-1.5 rounded-lg font-semibold text-sm transition-all disabled:cursor-not-allowed ${
                  selectedGender === "female"
                    ? "bg-amber-300 text-[#212121]"
                    : "bg-transparent text-white/70 hover:text-white"
                }`}
              >
                Female
              </button>
            </div>
            <button
              type="button"
              onClick={() => void fetchUsers(selectedGender)}
              disabled={isLoading}
              className="px-5 py-2 rounded-xl border-[5px] border-[#1a1a1a] bg-amber-300 font-semibold cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 flex gap-2 text-[#212121]"
            >
              <RefreshCcw width={16} />
              <p>Regenerate</p>
            </button>
          </div>
          <InfiniteMenu items={items} scale={1} />
        </>
      )}
    </div>
  );
};

export default App;
