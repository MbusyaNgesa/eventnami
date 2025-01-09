import Image from "next/image";
import icon1 from "../img/icon1.jpg";
import icon2 from "../img/icon2.jpg";

export const Hero = () => {
  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={icon2}
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
              src={icon1}
              alt="Featured"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          {/* Description Section */}
          <div className="text-center lg:text-left lg:ml-7">
            <h1 className="text-3xl font-bold">About Us</h1>
            <p className="mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem vitae
              a dolores eius. Nihil, consequatur esse quis tempora deserunt
              eveniet?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
