import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="fixed inset-0 overflow-hidden">
        <Image
          src="/images/launch-pad.jpg" // Adjust the path according to your project structure
          alt="background"
          quality={100}
          layout="fill"
        />
      </div>
    </div>
  );
}
