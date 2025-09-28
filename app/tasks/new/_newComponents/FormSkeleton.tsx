import Skeleton from "@/components/Skeleton";
import { Card } from "@radix-ui/themes";

const FormSkeleton = () => {
  return (
    <form className="space-y-3">
      <Card className="space-y-3">
        <Skeleton />
      </Card>
      <Card>
        {" "}
        <Skeleton height="25rem" />
      </Card>
      <Skeleton width="4rem" />
    </form>
  );
};

export default FormSkeleton;
