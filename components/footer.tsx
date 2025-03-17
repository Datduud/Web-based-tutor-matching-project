import { Separator } from "@/components/ui/separator";
const Footer = () => {
  return (
    <div className="py-5 mt-5">
      <div className="flex h-5 px-5 mt-10 items-center justify-center space-x-4 text-sm text-center">
        <div>Contact us</div>
        <Separator orientation="vertical" />
        <div>FAQ</div>
        <Separator orientation="vertical" />
        <div>Reviews</div>
        <Separator orientation="vertical" />
        <div>Legal Stuff</div>
        <Separator orientation="vertical" />
        <div>Privacy Policies</div>
      </div>
    </div>
  );
};

export default Footer;
