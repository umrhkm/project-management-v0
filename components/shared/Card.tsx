import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type CardProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
  button?: boolean;
  buttonLabel?: string;
  buttonLink?: boolean;
  buttonHref?: string;
  backButton?: boolean;
  backButtonHref?: string;
  footer?: boolean;
  footerLabel?: string;
  footerButtonLabel?: string;
  footerHref?: string;
};

const Card = ({
  title,
  description,
  children,
  button = true,
  buttonLabel,
  buttonLink = false,
  buttonHref,
  backButton = false,
  backButtonHref,
  footer = false,
  footerLabel,
  footerButtonLabel,
  footerHref,
}: CardProps) => {
  return (
    <article className="flex flex-col gap-8 px-10 py-12 w-[400px] md:w-[480px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-2xl">
      <div className="flex flex-col gap-2">
        {backButton && backButtonHref && (
          <Button variant={`link`} asChild className="w-fit px-0">
            <Link href={backButtonHref} className="group">
              <ArrowLeft
                width={16}
                hanging={16}
                className="text-secondary group-hover:text-black"
              />
              <span className="ml-2 text-secondary group-hover:text-black">
                Kembali
              </span>
            </Link>
          </Button>
        )}
        <h2 className="font-bold text-2xl">{title}</h2>
        <p className="font-normal text-base text-secondary">{description}</p>
      </div>

      {children && <div className="flex flex-col gap-8">{children}</div>}

      {button && (
        <Button
          className="bg-gold w-full text-center text-sm hover:bg-gold-500 tracking-wider"
          asChild={buttonLink}
        >
          {buttonLink && buttonHref ? (
            <Link href={buttonHref}>{buttonLabel}</Link>
          ) : (
            <>{buttonLabel}</>
          )}
        </Button>
      )}

      {footer && (
        <div className="flex gap-1">
          <p className="text-secondary">{footerLabel}</p>
          {footerButtonLabel && footerHref && (
            <Link href={footerHref} className="text-gold font-medium">
              {footerButtonLabel}
            </Link>
          )}
        </div>
      )}
    </article>
  );
};

export default Card;
