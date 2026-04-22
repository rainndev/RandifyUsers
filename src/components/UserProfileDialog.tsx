import { useEffect, useState } from "react";
import "./UserProfileDialog.css";

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
    <div className="upd-backdrop" onClick={onClose}>
      <div className="upd-dialog" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="upd-close"
          onClick={onClose}
          aria-label="Close profile dialog"
        >
          x
        </button>

        <div className="upd-header">
          <img className="upd-avatar" src={imageUrl} alt={fullName} />
          <div>
            <p className="upd-badge">Random User Profile</p>
            <h3 className="upd-title">{fullName}</h3>
            <p className="upd-subtitle">@{details.username}</p>
          </div>
        </div>

        <div
          className="upd-tabs"
          role="tablist"
          aria-label="User detail tabs"
          style={{ ["--upd-tab-index" as any]: activeTabIndex }}
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "overview"}
            className={`upd-tab ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <span
              className="upd-tab-icon upd-tab-icon--overview"
              aria-hidden="true"
            />
            <span>Overview</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "contact"}
            className={`upd-tab ${activeTab === "contact" ? "active" : ""}`}
            onClick={() => setActiveTab("contact")}
          >
            <span
              className="upd-tab-icon upd-tab-icon--contact"
              aria-hidden="true"
            />
            <span>Contact</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "location"}
            className={`upd-tab ${activeTab === "location" ? "active" : ""}`}
            onClick={() => setActiveTab("location")}
          >
            <span
              className="upd-tab-icon upd-tab-icon--location"
              aria-hidden="true"
            />
            <span>Location</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "account"}
            className={`upd-tab ${activeTab === "account" ? "active" : ""}`}
            onClick={() => setActiveTab("account")}
          >
            <span
              className="upd-tab-icon upd-tab-icon--account"
              aria-hidden="true"
            />
            <span>Account</span>
          </button>
        </div>

        <div className="upd-panel" role="tabpanel">
          {activeTab === "overview" && (
            <div key="overview" className="upd-grid upd-grid--animate">
              <p>
                <strong>Gender</strong>
                <span>{details.gender}</span>
              </p>
              <p>
                <strong>Age</strong>
                <span>{details.age}</span>
              </p>
              <p>
                <strong>Nationality</strong>
                <span>{details.nationality}</span>
              </p>
              <p>
                <strong>Birth Date</strong>
                <span>{formattedBirthDate}</span>
              </p>
              <p>
                <strong>Registered</strong>
                <span>{formattedRegisteredDate}</span>
              </p>
              <p>
                <strong>Timezone</strong>
                <span>
                  {details.location.timezoneOffset} (
                  {details.location.timezoneDescription})
                </span>
              </p>
            </div>
          )}

          {activeTab === "contact" && (
            <div key="contact" className="upd-grid upd-grid--animate">
              <p>
                <strong>Email</strong>
                <span>{details.email}</span>
              </p>
              <p>
                <strong>Phone</strong>
                <span>{details.phone}</span>
              </p>
              <p>
                <strong>Cell</strong>
                <span>{details.cell}</span>
              </p>
            </div>
          )}

          {activeTab === "location" && (
            <div key="location" className="upd-grid upd-grid--animate">
              <p>
                <strong>Street</strong>
                <span>{details.location.street}</span>
              </p>
              <p>
                <strong>City / State</strong>
                <span>
                  {details.location.city}, {details.location.state}
                </span>
              </p>
              <p>
                <strong>Country</strong>
                <span>{details.location.country}</span>
              </p>
              <p>
                <strong>Postcode</strong>
                <span>{details.location.postcode}</span>
              </p>
              <p>
                <strong>Coordinates</strong>
                <span>
                  {details.location.latitude}, {details.location.longitude}
                </span>
              </p>
            </div>
          )}

          {activeTab === "account" && (
            <div key="account" className="upd-grid upd-grid--animate">
              <p>
                <strong>Username</strong>
                <span>@{details.username}</span>
              </p>
              <p>
                <strong>UUID</strong>
                <span>{details.uuid}</span>
              </p>
              <p>
                <strong>ID Name</strong>
                <span>{details.idName || "N/A"}</span>
              </p>
              <p>
                <strong>ID Value</strong>
                <span>{details.idValue || "N/A"}</span>
              </p>
            </div>
          )}
        </div>

        <button
          type="button"
          className="upd-source"
          onClick={openSourceProfile}
        >
          Open Source Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfileDialog;
