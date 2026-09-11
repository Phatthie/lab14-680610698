import type { Registrant } from "../libs/Registrant";

const plans = [
  { id: "funrun", label: "Fun run 5.5 Km" },
  { id: "mini", label: "Mini Marathon 10 Km" },
  { id: "half", label: "Half Marathon 21 Km" },
  { id: "full", label: "Full Marathon 42.195 Km" },
];

const extraItems = [
  { id: "bottle", label: "Bottle 🍼" },
  { id: "shoes", label: "Shoes 👟" },
  { id: "cap", label: "Cap 🧢" },
];

export default function UserRegisterCard({ user }: { user: Registrant }) {
  // registrant.gender === "male"   -> "👨 Male"
  //registrant.gender === "female" -> "👩 Female"

  const planLabel = plans.find((p) => p.id === user.plan)?.label ?? user.plan;
  const genderLabel = user.gender === "male" ? "Male" : "Female";
  const genderIcon = user.gender === "male" ? "👨" : "👩";
  return <div className="card p-3">
    <div className="d-flex justify-content-between align-items-start">
        <div>
          <h5 className="mb-1">{user.fullName}</h5>
          <div className="text-muted">
            {planLabel} · {genderIcon} {genderLabel}
          </div>
          <div className="mt-2">
            {(user.extras ?? []).map((extraId) => {
              const item = extraItems.find((e) => e.id === extraId);
              return (
                <span key={extraId} className="badge bg-light text-dark border me-1">
                  {item?.label}
                </span>
              );
            })}
          </div>
        </div>
        <div className="fw-bold">{user.total.toLocaleString()} THB</div>
      </div>
  </div>;
}
