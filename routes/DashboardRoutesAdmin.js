import { v4 as uuid } from "uuid";

export const DashboardMenuAdmin = [
  {
    id: uuid(),
    title: "Anasayfa",
    icon: "home",
    link: "/admin",
  },
  {
    id: uuid(),
    title: "Admin Paneli",
    grouptitle: true,
  },
  {
    id: uuid(),
    title: "Profil",
    icon: "user",
    children: [
      { id: uuid(), link: "/admin", name: "Profil Özet" },
      { id: uuid(), link: "/admin-detail", name: "Profil Detay" },
      { id: uuid(), link: "/admin-update", name: "Profil Güncelleme" },
    ],
  },
  {
    id: uuid(),
    title: "Şirket",
    icon: "file-text",
    children: [
      { id: uuid(), link: "/admin-company-create", name: "Şirket Ekle" },
      { id: uuid(), link: "/admin-company-list", name: "Şirket Listesi" },
    ],
  },
  {
    id: uuid(),
    title: "Yönetici",
    icon: "user-check",
    children: [
      { id: uuid(), link: "/admin-manager-create", name: "Yönetici Ekle" },
      { id: uuid(), link: "/admin-manager-list", name: "Yönetici Listesi" },
    ],
  },
];

export default DashboardMenuAdmin;
