import React from "react";
import {
  Button,
  Breadcrumbs,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import  { FiMusic, FiArrowRight } from "react-icons/fi";
import { FaCodeBranch, FaCloud } from "react-icons/fa";

const Main = () => {
  return (
    <div className="flex flex-col md:flex-row gap-5 items-center justify-center flex-1 text-center p-4">
      <Card className="mt-6 w-full bg-[#00000044] text-white  animate-[pulse_7.5s_ease-in-out_infinite]">
        <CardBody>
        <FiMusic className="text-xl mb-4" />
          <Typography variant="h5" className="mb-2">
            Music-Enabled Commands
          </Typography>
          <Typography>
            Play music from YouTube for free forever and always.
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            size="sm"
            variant="gradient"
            className="flex items-center gap-2"
          >
            Learn More <FiArrowRight />
          </Button>
        </CardFooter>
      </Card>

      <Card className="mt-6 w-full bg-[#00000044] text-white animate-[pulse_7.7s_ease-in-out_infinite]">
        <CardBody>
          <FaCodeBranch className="text-xl mb-4" />
          <Typography variant="h5" className="mb-2">
            Open-Source
          </Typography>
          <Typography>
            Contribute to the project and help improve it for everyone.
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button size="sm" variant="gradient" className="flex items-center gap-2">
            Learn More <FiArrowRight />
          </Button>
        </CardFooter>
      </Card>

      <Card className="mt-6 w-full bg-[#00000044] text-white animate-[pulse_7.9s_ease-in-out_infinite]">
        <CardBody>
          <FaCloud className="text-xl mb-4" />
          <Typography variant="h5" className="mb-2">
            Self Hostable
          </Typography>
          <Typography>
            Host your own instance of the bot for full control and customization.
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button size="sm" variant="gradient" className="flex items-center gap-2">
            Learn More <FiArrowRight />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Main;
