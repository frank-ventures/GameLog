import QuantumSpinner from "../components/ldrsSpinners";

export default function Loading() {
  return (
    <div className="min-h-screen w-screen flex flex-col justify-center items-center">
      <p>Working on it...</p>
      <QuantumSpinner />
    </div>
  );
}
