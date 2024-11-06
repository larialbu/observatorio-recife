import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Voltar",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/calendar.png",
        label: "Panorama Recife",
        href: "/observatorio/panorama",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/exam.png",
        label: "Empregos",
        href: "/observatorio/empregos",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/class.png",
        label: "Empresas",
        href: "/observatorio/empresas",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "PIB",
        href: "/observatorio/pib",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/parent.png",
        label: "IPCA",
        href: "/observatorio/ipca",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/subject.png",
        label: "Ranking de Competitividade dos Municípios",
        href: "/observatorio/ranking-comp",
        visible: ["admin"],
      },
      {
        icon: "/lesson.png",
        label: "Portos",
        href: "/observatorio/portos",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/exam.png",
        label: "Aeroportos",
        href: "/observatorio/aeroportos",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/exam.png",
        label: "Balança Comercial",
        href: "/observatorio/bal-comercial",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/assignment.png",
        label: "Capacidade de Pagamentos",
        href: "/observatorio/cap-pagamentos",
        visible: ["admin", "teacher", "student", "parent"],
      },
      // {
      //   icon: "/attendance.png",
      //   label: "Attendance",
      //   href: "/observatorio/attendance",
      //   visible: ["admin", "teacher", "student", "parent"],
      // },
      // {
      //   icon: "/calendar.png",
      //   label: "Events",
      //   href: "/observatorio/events",
      //   visible: ["admin", "teacher", "student", "parent"],
      // },
      // {
      //   icon: "/message.png",
      //   label: "Messages",
      //   href: "/observatorio/messages",
      //   visible: ["admin", "teacher", "student", "parent"],
      // },
      // {
      //   icon: "/announcement.png",
      //   label: "Announcements",
      //   href: "/observatorio/announcements",
      //   visible: ["admin", "teacher", "student", "parent"],
      // },
    ],
  },
  {
    title: "OUTROS",
    items: [
      {
        icon: "/result.png",
        label: "Acesse o Boletim Econômico",
        href: "/boletim-economico",
        visible: ["admin", "teacher", "student", "parent"],
      }
      // {
      //   icon: "/profile.png",
      //   label: "Profile",
      //   href: "/profile",
      //   visible: ["admin", "teacher", "student", "parent"],
      // },
      // {
      //   icon: "/setting.png",
      //   label: "Settings",
      //   href: "/settings",
      //   visible: ["admin", "teacher", "student", "parent"],
      // },
      // {
      //   icon: "/logout.png",
      //   label: "Logout",
      //   href: "/logout",
      //   visible: ["admin", "teacher", "student", "parent"],
      // },
    ],
  },
];

const Menu = ({ open }: { open: boolean }) => {
  return (
    <div className={`${open ? "max-w-[200px] z-20" : ""} mt-4 text-sm`}>
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span
            className={`${open ? "block" : "hidden"
              } text-gray-400 font-light my-4`}
          >
            {i.title}
          </span>
          {i.items.map((item) => {
            return (
              <Link
                href={item.href}
                key={item.label}
                className={`flex max-w-[200px] items-center ${open ? "justify-start" : "justify-center"
                  } gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight`}
              >
                <Image src={item.icon} alt="" width={20} height={20} />
                <span className={`${open ? "block" : "hidden"}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
