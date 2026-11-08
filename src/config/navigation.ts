import type { AstroComponent } from "@lucide/astro";
import {
  Ban,
  Calendar,
  CircleQuestionMark,
  Crown,
  FileText,
  Layers,
  Sparkles,
} from "@lucide/astro";

export interface NavigationItem {
  href: string;
  label: string;
  icon: AstroComponent;
}

export const navigationItems: NavigationItem[] = [
  { href: "/regras", label: "Regras", icon: FileText },
  { href: "/banlist", label: "Banlist", icon: Ban },
  { href: "/faq", label: "Perguntas frequentes", icon: CircleQuestionMark },
  { href: "/eventos", label: "Eventos", icon: Calendar },
  { href: "/hall-da-fama", label: "Hall da Fama", icon: Sparkles },
  { href: "/campeoes", label: "Campeões", icon: Crown },
  { href: "/decks", label: "Decks", icon: Layers },
];
