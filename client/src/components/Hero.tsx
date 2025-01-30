import Image from "next/image";
import icon3 from "../img/icon3.png";
import icon4 from "../img/icon4.jpg";

export const Hero = () => {
  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={icon3}
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/20">
        <div className="container h-full flex flex-col lg:flex-row items-center">
          {/* Image Section */}
          <div className="mt-4 relative w-[400px] h-[300px] lg:w-[600px] lg:h-[450px] rounded-lg overflow-hidden lg:ml-10 mb-4 lg:mb-0">
            <Image
              src={icon4}
              alt="Featured"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          {/* Description Section */}
          <div className="text-center lg:text-left lg:ml-7">
            <h1 className="text-5xl font-bold mt-3">About Us</h1>
            <div className="max-w-[500px] ">
              <p className="mt-3 text-lg font-semibold">
                Welcome to Eventlify - your gateway to unforgettable
                experiences. We're a dynamic platform connecting event
                organizers, attendees, and vendors in one seamless space.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
