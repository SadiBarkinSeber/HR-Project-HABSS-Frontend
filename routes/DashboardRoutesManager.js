import { v4 as uuid } from "uuid";

export const DashboardMenuManager = [
  {
    id: uuid(),
    title: "Anasayfa",
    icon: "home",
    link: "/mng",
  },
  {
    id: uuid(),
    title: "Yönetici Paneli",
    grouptitle: true,
  },
  {
    id: uuid(),
    title: "Profil",
    icon: "user",
    children: [
      { id: uuid(), link: "/mng", name: "Profil Özet" },
      { id: uuid(), link: "/mng-detail", name: "Profil Detay" },
      { id: uuid(), link: "/mng-update", name: "Profil Güncelleme" },
    ],
  },
  {
    id: uuid(),
    title: "Personel",
    icon: "clipboard",
    children: [
      { id: uuid(), link: "/mng-employee-create", name: "Personel Ekle" },
      { id: uuid(), link: "/mng-employee-list", name: "Personel Listesi" },
    ],
  },
  {
    id: uuid(),
    title: "Talepler",
    icon: "dollar-sign",
    children: [
      { id: uuid(), link: "/mng-permission-list", name: "İzin Talepleri" },
      { id: uuid(), link: "/mng-expense-list", name: "Harcama Talepleri" },
      { id: uuid(), link: "/mng-advance-list", name: "Avans Talepleri" },
    ],
  },
];

export default DashboardMenuManager;
