import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { services } from "@/data";

export function Accordion05() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <Accordion type="single" defaultValue="01" collapsible className="w-full">
        {services.map((item, idx) => {
          const num = idx + 1;
          const id = `0${num}`;
          return (
            <AccordionItem value={id} key={id} className="border-b border-[#08090A]/15 last:border-b">
              <AccordionTrigger className="text-left py-5 md:py-7 px-2 md:px-4 overflow-hidden duration-300 hover:no-underline cursor-pointer [&>svg]:hidden group">
                <div className="flex items-baseline gap-3 sm:gap-5 w-full overflow-hidden">
                  <span className="font-sans text-xs sm:text-sm text-[#08090A]/40 group-data-[state=open]:text-[#FF3E6C] font-semibold select-none">
                    {num}
                  </span>
                  <h3
                    className="font-display font-bold uppercase tracking-tight text-xl sm:text-3xl md:text-4xl lg:text-5xl break-words text-[#08090A]/30 group-data-[state=open]:text-[#08090A] transition-colors duration-300"
                  >
                    {item.title}
                  </h3>
                </div>
              </AccordionTrigger>

              <AccordionContent className="text-[#5A5C5E] pb-6 pl-8 md:pl-12 pr-6">
                <div className="max-w-3xl space-y-4">
                  <p className="font-sans text-xl sm:text-2xl text-[#08090A] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

export default Accordion05;
