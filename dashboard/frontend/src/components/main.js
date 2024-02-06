import React from "react";
import {
  Button,
  Breadcrumbs,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

const Main = () => {
  return (
    <div className="flex flex-col md:flex-row gap-5 items-center justify-center flex-1 text-center">
      <Card className="mt-6 w-96 bg-[#00000044] text-white">
        <CardBody>
          {/* Icon or SVG here */}
          <Typography variant="h5" color="blue-gray-100" className="mb-2">
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
            Learn More {/* Icon or SVG for arrow */}
          </Button>
        </CardFooter>
      </Card>

      <Card className="mt-6 w-96 bg-[#00000044] text-white">
        <CardBody>
          {/* Icon or SVG here */}
          <Typography variant="h5" color="blue-gray-100" className="mb-2">
            Open-Source
          </Typography>
          <Typography>
            Contribute to the project and help improve it for everyone.
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button size="sm" variant="gradient" className="flex items-center gap-2">
            Learn More {/* Icon or SVG for arrow */}
          </Button>
        </CardFooter>
      </Card>

      <Card className="mt-6 w-96 bg-[#00000044] text-white">
        <CardBody>
          {/* Icon or SVG here */}
          <Typography variant="h5" color="blue-gray-100" className="mb-2">
            Self Hostable
          </Typography>
          <Typography>
            Host your own instance of the bot for full control and customization.
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button size="sm" variant="gradient" className="flex items-center gap-2">
            Learn More {/* Icon or SVG for arrow */}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Main;
