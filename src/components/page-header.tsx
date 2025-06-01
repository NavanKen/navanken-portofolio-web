import { cn } from "@/lib/utils";

interface PageHeaderProps {
  heading: string;
  subheading?: string;
  className?: string;
}

export function PageHeader({ heading, subheading, className }: PageHeaderProps) {
  return (
    <div className={cn("text-center", className)}>
      <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
        {heading}
      </h1>
      {subheading && (
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          {subheading}
        </p>
      )}
    </div>
  );
}
