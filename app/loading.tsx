export default function Loading() {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#F7F3ED] flex items-center justify-center">
      <div className="w-12 h-12 rounded-full bg-[#7A9E7E]/20 animate-pulse flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-[#7A9E7E] animate-breathe" />
      </div>
    </div>
  );
}
