import { useState } from "react";
import { type Registrant } from "../libs/Registrant";

type RegisterForm = {
  fname: string;
  lname: string;
  plan: string;
  gender: string;
};

//---- แผนการวิ่ง ----
const plans = [
  { id: "funrun", label: "Fun run 5.5 Km", price: 500 },
  { id: "mini", label: "Mini Marathon 10 Km", price: 800 },
  { id: "half", label: "Half Marathon 21 Km", price: 1200 },
  { id: "full", label: "Full Marathon 42.195 Km", price: 1500 },
];
// ---- สินค้าเสริม ----
const extraItems = [
  { id: "bottle", label: "Bottle 🍼", price: 200 },
  { id: "shoes", label: "Shoes 👟", price: 600 },
  { id: "cap", label: "Cap 🧢", price: 400 },
];

export default function ModalRegister({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<RegisterForm>({
    fname: "",
    lname: "",
    plan: "",
    gender: "",
  });

  const [agree, setAgree] = useState(false);
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [agree3, setAgree3] = useState(false);

  const [errors, setErrors] = useState({
    fname: false,
    lname: false,
    plan: false,
    gender: false,
  });

  const updateForm = (key: keyof RegisterForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: false }));
  };
  const registerBtnOnClick = () => {
    const newErrors = {
      fname: form.fname === "",
      lname: form.lname === "",
      plan: form.plan === "",
      gender: form.gender === "",
    };
    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((isError) => isError);
    if (hasError) return;

    const total = computeTotalPayment();

    const extras: string[] = [];
    if (agree1) extras.push("bottle");
    if (agree2) extras.push("shoes");
    if (agree3) extras.push("cap");

    const newRegistrant: Registrant = {
      id: Date.now(),
      fullName: `${form.fname} ${form.lname}`,
      gender: form.gender,
      plan: form.plan,
      total,
      extras,
    };

    const existing: Registrant[] = JSON.parse(
      localStorage.getItem("registrations") || "[]"
    );
    localStorage.setItem(
      "registrations",
      JSON.stringify([...existing, newRegistrant])
    );

    alert(
      `Registration complete. Please pay money for ${total.toLocaleString()} THB.`,
    );
  };

  const computeTotalPayment = () => {
    let total = 0;
    const selectedPlan = plans.find((p) => p.id === form.plan);
    if (selectedPlan) total += selectedPlan.price;
    
    if (agree1) total += extraItems.find((i) => i.id === "bottle")!.price;
    if (agree2) total += extraItems.find((i) => i.id === "shoes")!.price;
    if (agree3) total += extraItems.find((i) => i.id === "cap")!.price;

    if(agree1 && agree2 && agree3) total *= 0.8;

    return total;
  };

  return (
    <>
      <div className="modal fade show d-block" tabIndex={-1} role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Register CMU Marathon 🏃‍♂️</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              <div className="d-flex gap-2">
                <div>
                  <label className="form-label">First name</label>
                  <input
                    className={`form-control ${errors.fname ? "is-invalid" : ""}`}
                    onChange={(e) => updateForm("fname", e.target.value)}
                    value={form.fname}/>
                    <div className="invalid-feedback">Invalid first name</div>
                </div>
                <div>
                  <label className="form-label">Last name</label>
                  <input
                    className={`form-control ${errors.lname ? "is-invalid" : ""}`}
                    onChange={(e) => updateForm("lname", e.target.value)}
                    value={form.lname}/>
                </div>
                <div className="invalid-feedback">Invalid last name</div>
              </div>
              <div className="mt-2">
                <label className="form-label">Plan</label>
                <select
                    className={"form-select" + (errors.plan ? " is-invalid" : "")}
                    value={form.plan}
                    onChange={(e) => updateForm("plan", e.target.value)}
                  >
                    <option value="">Please select..</option>
                    {plans.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label} ({p.price.toLocaleString()} THB)
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">Please select a Plan</div>
              </div>
              <div className="mt-2">
                <label className="form-label">Gender</label>
                <div>
                  <input
                      className="me-2 form-check-input"
                      type="radio"
                      checked={form.gender === "male"}
                      onChange={() => updateForm("gender", "male")}
                    />
                    Male 👨
                  <input
                      className="mx-2 form-check-input"
                      type="radio"
                      checked={form.gender === "female"}
                      onChange={() => updateForm("gender", "female")}
                    />
                    Female 👩
                    {
                      errors.gender && <div className="text-danger">Please select gender</div>
                    }
                </div>
              </div>
              {/* Extra Items */}
              <div>
                <label className="form-label">Extra Item(s)</label>
                <div>
                  <input className="me-2 form-check-input" type="checkbox" checked={agree1} onChange={(e) => setAgree1(e.target.checked)} />Bottle 🍼 (200 THB)
                </div>
                <div>
                  <input className="me-2 form-check-input" type="checkbox" checked={agree2} onChange={(e) => setAgree2(e.target.checked)} />Shoes 👟 (600 THB)
                </div>
                <div>
                  <input className="me-2 form-check-input" type="checkbox" checked={agree3} onChange={(e) => setAgree3(e.target.checked)} />Cap 🧢 (400 THB)
                </div>
                {/* conditional เมื่อเลือกสินค้าเสริมทั้งหมด ให้แสดง discount*/}
                <span className="text-success d-block">(20% Discounted)</span>
              </div>

              <div className="alert alert-primary mt-3" role="alert">
                Promotion📢 Buy all items to get 20% Discount
              </div>

              <div className="mt-3">
                  Total Payment : {computeTotalPayment().toLocaleString()} THB
                </div>
            </div>

            <div className="modal-footer">
              <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              /> I agree to the terms and conditions
              <button
                className="btn btn-success my-2"
                onClick={registerBtnOnClick}
                disabled={!agree}>
                 Register
                </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}
