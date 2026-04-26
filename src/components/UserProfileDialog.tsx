import { CULTURE_SNAPSHOT_BY_NAT } from "@/data/culture-snap";
import type { CultureSnapshot } from "@/types/culture-snap.types";
import type { TabKey, UserDetails } from "@/types/User.types";
import { Eclipse, Leaf, Omega, StickyNote, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const buildCultureSnapshot = (natCode: string): CultureSnapshot => {
  const code = natCode.trim().toUpperCase();
  const mapped = CULTURE_SNAPSHOT_BY_NAT[code];

  if (mapped) {
    return mapped;
  }

  return {
    label: code || "Global",
    greetingStyle: "Respectful and context-aware greetings are recommended.",
    weekendPattern: "Varies by country and local tradition",
    quickNote: "Culture is diverse and dynamic; local context matters most.",
  };
};

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
  const [isCultureCardOpen, setIsCultureCardOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setActiveTab("overview");
    setIsCultureCardOpen(false);
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

  if (!details) {
    return null;
  }

  const activeTabIndex = TAB_INDEX[activeTab];

  const formattedBirthDate = new Date(details.birthDate).toLocaleDateString();
  const formattedRegisteredDate = new Date(
    details.registeredDate,
  ).toLocaleDateString();
  const cultureSnapshot = buildCultureSnapshot(details.nationality);

  const openSourceProfile = () => {
    if (!sourceLink) return;
    if (sourceLink.startsWith("http")) {
      window.open(sourceLink, "_blank");
    }
  };

  const panelSpringTransition = {
    type: "spring" as const,
    stiffness: 360,
    damping: 22,
    mass: 0.88,
    bounce: 0.45,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="profile-dialog-backdrop"
          className="absolute inset-0 z-30 grid place-items-center bg-[radial-gradient(circle_at_50%_10%,rgba(31,34,46,0.35),rgba(4,5,9,0.75))] backdrop-blur-[10px] border-[#1a1a1a] border-[5px]"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <motion.div
            key="profile-dialog-panel"
            layout
            className="max-h-[86vh] w-[min(92vw,900px)] overflow-auto  hide-scrollbar rounded-4xl border-[#1a1a1a] border-[5px] bg-[#212121] p-6 text-[#f4f5fb] shadow-[0_40px_90px_rgba(0,0,0,0.45)] max-[720px]:p-4"
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, y: 42, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 34, scale: 0.9 }}
            transition={panelSpringTransition}
          >
            <button
              type="button"
              className="float-right inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white"
              onClick={onClose}
              aria-label="Close profile dialog"
            >
              <X size={20} strokeWidth={2.4} />
            </button>

            <div className="mb-4 clear-both flex items-center gap-3.5">
              <img
                className="h-20 w-20 rounded-[18px] border-2 border-white/20 object-cover"
                src={imageUrl}
                alt={fullName}
              />
              <div>
                <h3 className="m-[2px_0] text-[clamp(1.25rem,3vw,1.5rem)] leading-[1.2]">
                  {fullName}
                </h3>
                <p className="text-xs  bg-amber-300 inline-block rounded-full text-[#1a1a1a] border-3 border-[#1a1a1a] font-semibold  px-7 py-0.5 mt-1 ">
                  @{details.username}
                </p>
              </div>
            </div>

            <div
              className="relative mb-3.5 grid grid-cols-4 gap-2 overflow-hidden rounded-[14px] bg-white/2 p-1.5 max-[720px]:grid-cols-2"
              role="tablist"
              aria-label="User detail tabs"
              style={
                {
                  ["--upd-tab-index" as any]: activeTabIndex,
                } as React.CSSProperties
              }
            >
              <span
                className="pointer-events-none absolute bottom-1.5 left-1.5 top-1.5 rounded-xl bg-amber-300  border-5 border-[#212121] transition-transform duration-260 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  width: "calc((100% - 35px) / 4)",
                  transform: `translateX(calc(${activeTabIndex} * (100% + 8px)))`,
                }}
              />

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "overview"}
                className={`relative z-1 inline-flex min-w-0 items-center justify-center gap-1.75 whitespace-nowrap rounded-[10px] border-0 bg-transparent px-2 py-2.5 font-semibold transition-all duration-150 focus:outline-none focus-visible:outline-none ${
                  activeTab === "overview"
                    ? "text-[#212121]"
                    : "text-white/50 hover:-translate-y-px hover:text-white"
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
                className={`relative z-1 inline-flex min-w-0 items-center justify-center gap-1.75 whitespace-nowrap rounded-[10px] border-0 bg-transparent px-2 py-2.5 font-semibold transition-all duration-150 focus:outline-none focus-visible:outline-none ${
                  activeTab === "contact"
                    ? "text-[#212121]"
                    : "text-white/50 hover:-translate-y-px hover:text-white"
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
                className={`relative z-1 inline-flex min-w-0 items-center justify-center gap-1.75 whitespace-nowrap rounded-[10px] border-0 bg-transparent px-2 py-2.5 font-semibold transition-all duration-150 focus:outline-none focus-visible:outline-none ${
                  activeTab === "location"
                    ? "text-[#212121]"
                    : "text-white/50 hover:-translate-y-px hover:text-white"
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
                className={`relative z-1 inline-flex min-w-0 items-center justify-center gap-1.75 whitespace-nowrap rounded-[10px] border-0 bg-transparent px-2 py-2.5 font-semibold transition-all duration-150 focus:outline-none focus-visible:outline-none ${
                  activeTab === "account"
                    ? "text-[#212121]"
                    : "text-white/50 hover:-translate-y-px hover:text-white"
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
              className="mb-3.5 min-h-45 rounded-[14px]  bg-[#1a1a1a]  p-3.5"
              role="tabpanel"
            >
              {activeTab === "overview" && (
                <div
                  key="overview"
                  className="grid grid-cols-2 gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200 max-[720px]:grid-cols-1"
                >
                  <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl  px-3 py-2.5">
                    <strong className="text-[0.74rem] uppercase tracking-wider text-white/65">
                      Gender
                    </strong>
                    <span className="text-[0.95rem] leading-[1.35] wrap-break-word">
                      {details.gender}
                    </span>
                  </p>
                  <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl  px-3 py-2.5">
                    <strong className="text-[0.74rem] uppercase tracking-wider text-white/65">
                      Age
                    </strong>
                    <span className="text-[0.95rem] leading-[1.35] wrap-break-word">
                      {details.age}
                    </span>
                  </p>
                  <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl  px-3 py-2.5">
                    <strong className="text-[0.74rem] uppercase tracking-wider text-white/65">
                      Nationality
                    </strong>
                    <span className="text-[0.95rem] leading-[1.35] wrap-break-word">
                      {details.nationality}
                    </span>
                  </p>
                  <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl  px-3 py-2.5">
                    <strong className="text-[0.74rem] uppercase tracking-wider text-white/65">
                      Birth Date
                    </strong>
                    <span className="text-[0.95rem] leading-[1.35] wrap-break-word">
                      {formattedBirthDate}
                    </span>
                  </p>
                  <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl  px-3 py-2.5">
                    <strong className="text-[0.74rem] uppercase tracking-wider text-white/65">
                      Registered
                    </strong>
                    <span className="text-[0.95rem] leading-[1.35] wrap-break-word">
                      {formattedRegisteredDate}
                    </span>
                  </p>
                  <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl  px-3 py-2.5">
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
                  <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl  px-3 py-2.5">
                    <strong className="text-[0.74rem] uppercase tracking-wider text-white/65">
                      Email
                    </strong>
                    <span className="text-[0.95rem] leading-[1.35] wrap-break-word">
                      {details.email}
                    </span>
                  </p>
                  <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl  px-3 py-2.5">
                    <strong className="text-[0.74rem] uppercase tracking-wider text-white/65">
                      Phone
                    </strong>
                    <span className="text-[0.95rem] leading-[1.35] wrap-break-word">
                      {details.phone}
                    </span>
                  </p>
                  <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl  px-3 py-2.5">
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
                  <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl  px-3 py-2.5">
                    <strong className="text-[0.74rem] uppercase tracking-wider text-white/65">
                      Street
                    </strong>
                    <span className="text-[0.95rem] leading-[1.35] wrap-break-word">
                      {details.location.street}
                    </span>
                  </p>
                  <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl  px-3 py-2.5">
                    <strong className="text-[0.74rem] uppercase tracking-wider text-white/65">
                      City / State
                    </strong>
                    <span className="text-[0.95rem] leading-[1.35] wrap-break-word">
                      {details.location.city}, {details.location.state}
                    </span>
                  </p>
                  <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl  px-3 py-2.5">
                    <strong className="text-[0.74rem] uppercase tracking-wider text-white/65">
                      Country
                    </strong>
                    <span className="text-[0.95rem] leading-[1.35] wrap-break-word">
                      {details.location.country}
                    </span>
                  </p>
                  <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl  px-3 py-2.5">
                    <strong className="text-[0.74rem] uppercase tracking-wider text-white/65">
                      Postcode
                    </strong>
                    <span className="text-[0.95rem] leading-[1.35] wrap-break-word">
                      {details.location.postcode}
                    </span>
                  </p>
                  <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl  px-3 py-2.5">
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
                  <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl  px-3 py-2.5">
                    <strong className="text-[0.74rem] uppercase tracking-wider text-white/65">
                      Username
                    </strong>
                    <span className="text-[0.95rem] leading-[1.35] wrap-break-word">
                      @{details.username}
                    </span>
                  </p>
                  <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl  px-3 py-2.5">
                    <strong className="text-[0.74rem] uppercase tracking-wider text-white/65">
                      UUID
                    </strong>
                    <span className="text-[0.95rem] leading-[1.35] wrap-break-word">
                      {details.uuid}
                    </span>
                  </p>
                  <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl  px-3 py-2.5">
                    <strong className="text-[0.74rem] uppercase tracking-wider text-white/65">
                      ID Name
                    </strong>
                    <span className="text-[0.95rem] leading-[1.35] wrap-break-word">
                      {details.idName || "N/A"}
                    </span>
                  </p>
                  <p className="m-0 flex min-h-16 flex-col gap-1 rounded-xl  px-3 py-2.5">
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

            <AnimatePresence>
              {isCultureCardOpen && (
                <motion.div
                  className="culture-snapshot-card "
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <p className="culture-snapshot-country">
                    {cultureSnapshot.label}
                  </p>

                  <div className="culture-snapshot-chip-row" aria-hidden="true">
                    <span className="culture-snapshot-chip">culture note</span>
                    <span className="culture-snapshot-chip">educational</span>
                    <span className="culture-snapshot-chip">
                      nat {details.nationality}
                    </span>
                  </div>

                  <div className="culture-snapshot-grid">
                    <article className="culture-snapshot-entry">
                      <p className="culture-snapshot-entry-label flex items-center gap-1">
                        <span>
                          <Omega width={16} />
                        </span>
                        Greeting
                      </p>
                      <p className="culture-snapshot-entry-value ">
                        {cultureSnapshot.greetingStyle}
                      </p>
                    </article>

                    <article className="culture-snapshot-entry">
                      <p className="culture-snapshot-entry-label flex items-center gap-1">
                        <span>
                          <Eclipse width={16} />
                        </span>
                        Pattern
                      </p>
                      <p className="culture-snapshot-entry-value">
                        {cultureSnapshot.weekendPattern}
                      </p>
                    </article>

                    <article className="culture-snapshot-entry culture-snapshot-entry-wide">
                      <p className="culture-snapshot-entry-label flex items-center gap-1">
                        <span>
                          <StickyNote width={16} />
                        </span>
                        Note
                      </p>
                      <p className="culture-snapshot-entry-value">
                        {cultureSnapshot.quickNote}
                      </p>
                    </article>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex w-full items-stretch gap-2">
              <button
                type="button"
                className="flex-1 cursor-pointer rounded-xl border-0 bg-amber-300 px-3.5 py-3 font-bold text-[#1d1825]"
                onClick={openSourceProfile}
              >
                Source Profile
              </button>

              <button
                type="button"
                className="flex-1 flex cursor-pointer items-center justify-center border-[5px] border-[#1a1a1a] rounded-xl bg-transparent text-white/70 "
                onClick={() => setIsCultureCardOpen((prev) => !prev)}
                aria-label={
                  isCultureCardOpen
                    ? "Hide culture snapshot"
                    : "Show culture snapshot"
                }
              >
                <span>
                  <Leaf
                    className={`transition-transform duration-300 ease-in-out text-amber-200 ${
                      !isCultureCardOpen ? "rotate-0" : "rotate-45"
                    }`}
                    width={20}
                  />
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserProfileDialog;
