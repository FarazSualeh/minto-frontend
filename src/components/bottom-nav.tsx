import { Heart, House, LayoutGrid, ShoppingBag, UserRound } from "lucide-react";
import Link from "next/link";

const items = [
  { label: "Home", href: "/home", icon: House },
  { label: "Categories", href: "/categories", icon: LayoutGrid },
  { label: "Cart", href: "/cart", icon: ShoppingBag },
  { label: "Saved", href: "/saved", icon: Heart },
  { label: "Account", href: "/account", icon: UserRound },
];

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[#e7eadf] bg-white px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex min-h-12 flex-col items-center justify-center gap-1 text-[10px] font-semibold text-[#748075]"
            >
              <Icon size={20} strokeWidth={2} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
