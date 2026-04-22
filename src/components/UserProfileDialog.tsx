import { useEffect, useState } from "react";

export type UserDetails = {
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

type TabKey = "overview" | "contact" | "location" | "account";

const TAB_INDEX: Record<TabKey, number> = {
  overview: 0,
  contact: 1,
  location: 2,
  account: 3,
};

type UserProfileDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  fullName: string;
  imageUrl: string;
  sourceLink?: string;
  details?: UserDetails;
};

const UserProfileDialog = ({
  isOpen,
  onClose,
  fullName,
  imageUrl,
  sourceLink,
  details,
}: UserProfileDialogProps) => {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  useEffect(() => {
    if (!isOpen) return;

    setActiveTab("overview");
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !details) {
    return null;
  }

  const activeTabIndex = TAB_INDEX[activeTab];

  const formattedBirthDate = new Date(details.birthDate).toLocaleDateString();
  const formattedRegisteredDate = new Date(
    details.registeredDate,
  ).toLocaleDateString();

  const openSourceProfile = () => {
    if (!sourceLink) return;
    if (sourceLink.startsWith("http")) {
      window.open(sourceLink, "_blank");
    }
  };

  return (
    <div
      className="absolute inset-0 z-30 grid place-items-center bg-[radial-gradient(circle_at_50%_10%,rgba(31,34,46,0.35),rgba(4,5,9,0.75))] backdrop-blur-[10px] animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="max-h-[86vh] w-[min(92vw,780px)] overflow-auto rounded-[24px] border border-white/15 bg-[#212121] p-6 text-[#f4f5fb] shadow-[0_40px_90px_rgba(0,0,0,0.45)] animate-in fade-in slide-in-from-bottom-4 zoom-in-95 duration-200 max-[720px]:rounded-[18px] max-[720px]:p-4"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="float-right h-8.5 w-8.5 cursor-pointer rounded-full border border-white/20 bg-white/10 text-white"
          onClick={onClose}
          aria-label="Close profile dialog"
        >
          x
        </button>

        <div className="mb-4 clear-both flex items-center gap-3.5">
          <img
            className="h-20 w-20 rounded-[18px] border-2 border-white/20 object-cover"
            src={imageUrl}
            alt={fullName}
          />
          <div>
            <p className="m-0 text-[0.7rem] uppercase tracking-[0.08em] text-[#c5a86a]">
              Random User Profile
            </p>
            <h3 className="m-[2px_0] text-[clamp(1.25rem,3vw,1.8rem)] leading-[1.2]">
              {fullName}
            </h3>
            <p className="m-0 text-white/70">@{details.username}</p>
          </div>
        </div>

        <div
          className="relative mb-3.5 grid grid-cols-4 gap-2 rounded-[14px] bg-white/5 p-1.5 max-[720px]:grid-cols-2"
          role="tablist"
          aria-label="User detail tabs"
          style={
            {
              ["--upd-tab-index" as any]: activeTabIndex,
            } as React.CSSProperties
          }
        >
          <span
            className="pointer-events-none absolute bottom-1.5 left-1.5 top-1.5 rounded-[10px] bg-linear-to-b from-[rgba(242,208,124,0.22)] to-[rgba(242,208,124,0.1)] transition-transform duration-260 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              width: "calc((100% - 24px) / 4)",
              transform: `translateX(calc(${activeTabIndex} * (100% + 8px)))`,
            }}
          />

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "overview"}
            className={`relative z-1 inline-flex items-center justify-center gap-1.75 rounded-[10px] border-0 bg-transparent px-2 py-2.5 font-semibold transition-all duration-150 ${
              activeTab === "overview"
                ? "text-[#f5d98f]"
                : "text-white/80 hover:-translate-y-px hover:text-white"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            <span
              className="inline-block h-3.25 w-3.25 rounded-sm border-2 border-current opacity-85"
              aria-hidden="true"
            />
            <span>Overview</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "contact"}
            className={`relative z-1 inline-flex items-center justify-center gap-1.75 rounded-[10px] border-0 bg-transparent px-2 py-2.5 font-semibold transition-all duration-150 ${
              activeTab === "contact"
                ? "text-[#f5d98f]"
                : "text-white/80 hover:-translate-y-px hover:text-white"
            }`}
            onClick={() => setActiveTab("contact")}
          >
            <span
              className="inline-block h-3.25 w-3.25 rounded-full border-2 border-current opacity-85 shadow-[inset_0_-2px_0_0_currentColor]"
              aria-hidden="true"
            />
            <span>Contact</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "location"}
            className={`relative z-1 inline-flex items-center justify-center gap-1.75 rounded-[10px] border-0 bg-transparent px-2 py-2.5 font-semibold transition-all duration-150 ${
              activeTab === "location"
                ? "text-[#f5d98f]"
                : "text-white/80 hover:-translate-y-px hover:text-white"
            }`}
            onClick={() => setActiveTab("location")}
          >
            <span
              className="inline-block h-3.25 w-3.25 rounded-[999px_999px_999px_2px] border-2 border-current opacity-85 -rotate-45"
              aria-hidden="true"
            />
            <span>Location</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "account"}
            className={`relative z-1 inline-flex items-center justify-center gap-1.75 rounded-[10px] border-0 bg-transparent px-2 py-2.5 font-semibold transition-all duration-150 ${
              activeTab === "account"
                ? "text-[#f5d98f]"
                : "text-white/80 hover:-translate-y-px hover:text-white"
            }`}
            onClick={() => setActiveTab("account")}
          >
            <span
              className="inline-block h-3.25 w-3.25 rounded-full border-2 border-dashed border-current opacity-85"
              aria-hidden="true"
            />
            <span>Account</span>
          </button>
        </div>

        <div
          className="mb-3.5 min-h-45 rounded-[14px] border border-white/10 bg-white/3 p-3.5"
          role="tabpanel"
        >
          {activeTab === "overview" && (
            <div
              key="overview"
              className="grid grid-cols-2 gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200 max-[720px]:grid-cols-1"
            >
              <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl border border-white/10 bg-white/4 px-3 py-2.5">
                <strong className="text-[0.74rem] uppercase tracking-wider text-white/65">
                  Gender
                </strong>
                <span className="text-[0.95rem] leading-[1.35] wrap-break-word">
                  {details.gender}
                </span>
              </p>
              <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl border border-white/10 bg-white/4 px-3 py-2.5">
                <strong className="text-[0.74rem] uppercase tracking-wider text-white/65">
                  Age
                </strong>
                <span className="text-[0.95rem] leading-[1.35] wrap-break-word">
                  {details.age}
                </span>
              </p>
              <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl border border-white/10 bg-white/4 px-3 py-2.5">
                <strong className="text-[0.74rem] uppercase tracking-wider text-white/65">
                  Nationality
                </strong>
                <span className="text-[0.95rem] leading-[1.35] wrap-break-word">
                  {details.nationality}
                </span>
              </p>
              <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl border border-white/10 bg-white/4 px-3 py-2.5">
                <strong className="text-[0.74rem] uppercase tracking-wider text-white/65">
                  Birth Date
                </strong>
                <span className="text-[0.95rem] leading-[1.35] wrap-break-word">
                  {formattedBirthDate}
                </span>
              </p>
              <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl border border-white/10 bg-white/4 px-3 py-2.5">
                <strong className="text-[0.74rem] uppercase tracking-wider text-white/65">
                  Registered
                </strong>
                <span className="text-[0.95rem] leading-[1.35] wrap-break-word">
                  {formattedRegisteredDate}
                </span>
              </p>
              <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl border border-white/10 bg-white/4 px-3 py-2.5">
                <strong className="text-[0.74rem] uppercase tracking-wider text-white/65">
                  Timezone
                </strong>
                <span className="text-[0.95rem] leading-[1.35] wrap-break-word">
                  {details.location.timezoneOffset} (
                  {details.location.timezoneDescription})
                </span>
              </p>
            </div>
          )}

          {activeTab === "contact" && (
            <div
              key="contact"
              className="grid grid-cols-2 gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200 max-[720px]:grid-cols-1"
            >
              <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl border border-white/10 bg-white/4 px-3 py-2.5">
                <strong className="text-[0.74rem] uppercase tracking-wider text-white/65">
                  Email
                </strong>
                <span className="text-[0.95rem] leading-[1.35] wrap-break-word">
                  {details.email}
                </span>
              </p>
              <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl border border-white/10 bg-white/4 px-3 py-2.5">
                <strong className="text-[0.74rem] uppercase tracking-wider text-white/65">
                  Phone
                </strong>
                <span className="text-[0.95rem] leading-[1.35] wrap-break-word">
                  {details.phone}
                </span>
              </p>
              <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl border border-white/10 bg-white/4 px-3 py-2.5">
                <strong className="text-[0.74rem] uppercase tracking-wider text-white/65">
                  Cell
                </strong>
                <span className="text-[0.95rem] leading-[1.35] wrap-break-word">
                  {details.cell}
                </span>
              </p>
            </div>
          )}

          {activeTab === "location" && (
            <div
              key="location"
              className="grid grid-cols-2 gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200 max-[720px]:grid-cols-1"
            >
              <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl border border-white/10 bg-white/4 px-3 py-2.5">
                <strong className="text-[0.74rem] uppercase tracking-wider text-white/65">
                  Street
                </strong>
                <span className="text-[0.95rem] leading-[1.35] wrap-break-word">
                  {details.location.street}
                </span>
              </p>
              <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl border border-white/10 bg-white/4 px-3 py-2.5">
                <strong className="text-[0.74rem] uppercase tracking-wider text-white/65">
                  City / State
                </strong>
                <span className="text-[0.95rem] leading-[1.35] wrap-break-word">
                  {details.location.city}, {details.location.state}
                </span>
              </p>
              <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl border border-white/10 bg-white/4 px-3 py-2.5">
                <strong className="text-[0.74rem] uppercase tracking-wider text-white/65">
                  Country
                </strong>
                <span className="text-[0.95rem] leading-[1.35] wrap-break-word">
                  {details.location.country}
                </span>
              </p>
              <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl border border-white/10 bg-white/4 px-3 py-2.5">
                <strong className="text-[0.74rem] uppercase tracking-wider text-white/65">
                  Postcode
                </strong>
                <span className="text-[0.95rem] leading-[1.35] wrap-break-word">
                  {details.location.postcode}
                </span>
              </p>
              <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl border border-white/10 bg-white/4 px-3 py-2.5">
                <strong className="text-[0.74rem] uppercase tracking-wider text-white/65">
                  Coordinates
                </strong>
                <span className="text-[0.95rem] leading-[1.35] wrap-break-word">
                  {details.location.latitude}, {details.location.longitude}
                </span>
              </p>
            </div>
          )}

          {activeTab === "account" && (
            <div
              key="account"
              className="grid grid-cols-2 gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200 max-[720px]:grid-cols-1"
            >
              <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl border border-white/10 bg-white/4 px-3 py-2.5">
                <strong className="text-[0.74rem] uppercase tracking-wider text-white/65">
                  Username
                </strong>
                <span className="text-[0.95rem] leading-[1.35] wrap-break-word">
                  @{details.username}
                </span>
              </p>
              <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl border border-white/10 bg-white/4 px-3 py-2.5">
                <strong className="text-[0.74rem] uppercase tracking-wider text-white/65">
                  UUID
                </strong>
                <span className="text-[0.95rem] leading-[1.35] wrap-break-word">
                  {details.uuid}
                </span>
              </p>
              <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl border border-white/10 bg-white/4 px-3 py-2.5">
                <strong className="text-[0.74rem] uppercase tracking-wider text-white/65">
                  ID Name
                </strong>
                <span className="text-[0.95rem] leading-[1.35] wrap-break-word">
                  {details.idName || "N/A"}
                </span>
              </p>
              <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl border border-white/10 bg-white/4 px-3 py-2.5">
                <strong className="text-[0.74rem] uppercase tracking-wider text-white/65">
                  ID Value
                </strong>
                <span className="text-[0.95rem] leading-[1.35] wrap-break-word">
                  {details.idValue || "N/A"}
                </span>
              </p>
            </div>
          )}
        </div>

        <button
          type="button"
          className="w-full cursor-pointer rounded-xl border-0 bg-amber-300 px-3.5 py-3 font-bold text-[#1d1825] transition hover:-translate-y-px hover:shadow-[0_14px_24px_rgba(0,0,0,0.35)]"
          onClick={openSourceProfile}
        >
          Open Source Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfileDialog;
