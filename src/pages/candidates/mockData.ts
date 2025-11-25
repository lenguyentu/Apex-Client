export interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  phase: string | null
  applied_position: string | null
  cv_link: string
  address: string | null
  location: string | null
}

export const mockCandidates: Candidate[] = [
  {
    id: "c4a3b2f1-9a7e-4ad4-bfa8-f9edde8d7140",
    name: "Nguyen Thi Ngoc Nga",
    email: "ngangoc36.neu@gmail.com",
    phone: "0375553703",
    phase: "New_Lead",
    applied_position: "Human Resource Business Partner Leader",
    cv_link: "https://dqnjtkbxtscjikalkajq.supabase.co/storage/v1/object/public/cv/public/f4b3dbfd-d420-4f9d-8b63-508131783521/d86974c0-bb0f-4b01-bb11-db5158be1cd4-cv_hrbp_nga_nguyen.pdf",
    address: null,
    location: null
  },
  {
    id: "4df0a09d-d9dd-41f1-89c0-c3fb0926bceb",
    name: "Dao Minh Hai",
    email: "Minhhai.0801@gmail.com",
    phone: "0964 888 885",
    phase: "New_Lead",
    applied_position: "Finance Manager",
    cv_link: "https://dqnjtkbxtscjikalkajq.supabase.co/storage/v1/object/public/cv/public/88c0482f-a9c5-4e4a-983e-dcbd98191b04/8ff884bb-dd1e-4755-a2ce-685bfa7ddc07-cv_dao_minh_hai_ktt_hn.pdf",
    address: null,
    location: "Nam Tu Liem – Ha Noi"
  },
  {
    id: "e4808229-3a9c-49b0-a26f-8d3c216f4354",
    name: "Đào Thị Chinh",
    email: "chinh28111999@gmail.com",
    phone: "0352813280",
    phase: "New_Lead",
    applied_position: "Kế toán nội bộ",
    cv_link: "https://dqnjtkbxtscjikalkajq.supabase.co/storage/v1/object/public/cv/public/57afe190-d753-47ba-aaca-aec9c80c169e/15fbd4fe-7b43-4921-a192-d271e52a410b-Dao_Thi_Chinh.pdf",
    address: "Thôn Và, Tốt Động (cũ), Chương Mỹ, Hà Nội",
    location: "Hà Nội"
  },
  {
    id: "034ab274-b04c-41f0-9729-1fda399f506c",
    name: "Đào Thu Hiền",
    email: "Daothuhien25991@gmail.com",
    phone: "0982735564",
    phase: "New_Lead",
    applied_position: "Kế toán nội bộ",
    cv_link: "https://dqnjtkbxtscjikalkajq.supabase.co/storage/v1/object/public/cv/public/57afe190-d753-47ba-aaca-aec9c80c169e/be5935b4-a6f4-4dfa-8965-9e0b7bf69701-Dao_Thu_Hien.pdf",
    address: "Quận Long Biên - Hà Nội",
    location: "Hà Nội"
  },
  {
    id: "79221e10-b69d-4773-9558-974df746173b",
    name: "Tran Kim Thoa",
    email: "kimthoa1104@gmail.com",
    phone: "0978 135 798",
    phase: "New_Lead",
    applied_position: "Kế toán nội bộ",
    cv_link: "https://dqnjtkbxtscjikalkajq.supabase.co/storage/v1/object/public/cv/public/57afe190-d753-47ba-aaca-aec9c80c169e/ac818d3b-068e-4410-b516-7cce3d022fe6-Tran_Kim_Thoa.pdf",
    address: "No 45/640/65 Nguyen Van Cu, Long Bien District, Ha Noi",
    location: "Hà Nội"
  },
  {
    id: "29935f1e-9ef1-44ee-98c9-740c8b52bb20",
    name: "Đỗ Đức Hiếu",
    email: "hieu.duc.hanu@gmail.com",
    phone: "0972888846",
    phase: null,
    applied_position: null,
    cv_link: "https://dqnjtkbxtscjikalkajq.supabase.co/storage/v1/object/public/cv/public/76b9ef95-96f9-42c8-9d09-5adbaece1279/9aa344c0-3a0c-40bf-a2d1-0d9ebfc77a94-CV__Do_Duc_Hieu.pdf",
    address: "Quận Hà Đông, TP.Hà Nội",
    location: null
  },
  {
    id: "48912d4e-1c77-4480-8b3e-3933fb20d4ac",
    name: "Ms Nhiên",
    email: "Luyenqld@gmail.com",
    phone: "0989342970",
    phase: null,
    applied_position: "TP Nhân sự - Trợ lý TGĐ",
    cv_link: "https://dqnjtkbxtscjikalkajq.supabase.co/storage/v1/object/public/cv/public/76b9ef95-96f9-42c8-9d09-5adbaece1279/b24d322e-1e84-49e5-887e-2d212a161117-Ms-Nhien-TopCV.vn-241125.111359.pdf",
    address: "Phạm Văn Đồng - Hà Nội",
    location: null
  },
  {
    id: "1cfcd628-ee58-4717-8a5e-7039ac1bf6f7",
    name: "Trần Thị Hạnh",
    email: "tuongvy2d9m@gmail.com",
    phone: "0934562859",
    phase: "New_Lead",
    applied_position: null,
    cv_link: "https://dqnjtkbxtscjikalkajq.supabase.co/storage/v1/object/public/cv/public/50409328-2907-45db-97f1-cd90e7a0a07a/034f8daf-797e-4e28-8665-f1409aac6e56-tra__n_thi__ha_nh_tp.hcns.pdf",
    address: null,
    location: "Phú Thượng-Tây Hồ-Hà Nội"
  },
  {
    id: "38611cb3-280f-4db2-9e28-d2b08da3e43d",
    name: "Phạm Duy Ninh",
    email: "Duyninhcomputer@gmail.com",
    phone: "0979822208",
    phase: "New_Lead",
    applied_position: "Trưởng phòng hành chính nhân sự",
    cv_link: "https://dqnjtkbxtscjikalkajq.supabase.co/storage/v1/object/public/cv/public/50409328-2907-45db-97f1-cd90e7a0a07a/d6e73ced-6880-4b15-9738-e9b51f7de6e6-cv.phamduyninh.pdf",
    address: null,
    location: "Phù Linh, Sóc Sơn, Hà Nội"
  },
  {
    id: "61e9479f-a620-4122-b804-496803f0f1b0",
    name: "Nguyễn Huy Khang",
    email: "nghuykhang20@gmail.com",
    phone: "0383759885",
    phase: "New_Lead",
    applied_position: "Nhân Viên Kinh Doanh, Tư Vấn",
    cv_link: "https://dqnjtkbxtscjikalkajq.supabase.co/storage/v1/object/public/cv/public/455cf839-77f2-4738-9e5f-77fc3ece1c48/f5fcc6b9-21a2-4598-80d8-af00de9219ab-cv-m_i1763720933609.pdf",
    address: null,
    location: "Phố Vĩnh Hưng, quận Hoàng Mai, Hà Nội"
  },
  {
    id: "acc83a22-b264-42ad-a18e-46f3008386dd",
    name: "VŨ KHÁNH LINH",
    email: "linhkhanhvu1112@gmail.com",
    phone: "0374283667",
    phase: "New_Lead",
    applied_position: null,
    cv_link: "https://dqnjtkbxtscjikalkajq.supabase.co/storage/v1/object/public/cv/public/88c0482f-a9c5-4e4a-983e-dcbd98191b04/5b7e509c-ef3c-4734-9309-9f8add846ae3-cv__v__kh_nh_linh_tr__l_-hn.pdf",
    address: null,
    location: null
  },
  {
    id: "9f542dbd-4d61-4f42-b85c-7a330bcddab3",
    name: "Nguyễn Thị Phương",
    email: "nguyenthiphuong023@gmail.com",
    phone: "0988697320",
    phase: "New_Lead",
    applied_position: "Nhân viên Seller",
    cv_link: "https://dqnjtkbxtscjikalkajq.supabase.co/storage/v1/object/public/cv/public/dfc8aa70-bc61-4e05-a64f-4cea8ad1bdbc/eae7ae04-a9b8-45ea-8a6d-d18e02013702-nguye__n_thi__phu_o_ng.pdf",
    address: null,
    location: "Trâu Quỳ, Gia Lâm, Hà Nội"
  },
  {
    id: "a86e1768-ac6d-4b8c-9e26-7721bf5a999d",
    name: "Hoàng Thị Bích Loan",
    email: "bichloanmarketing@gmail.com",
    phone: "08 5629 5679",
    phase: "New_Lead",
    applied_position: "Marketing Leader",
    cv_link: "https://dqnjtkbxtscjikalkajq.supabase.co/storage/v1/object/public/cv/public/6e1b05e8-0b5d-45af-b9eb-fefca6293409/7168d922-9b6c-4e58-be71-6ee293fc36e2-seo_remote_-_ho_ng_th__b_ch_loan.pdf",
    address: null,
    location: "Quận 12, TP. Hồ Chí Minh"
  },
  {
    id: "49a6f670-a355-48f1-97f8-3bf47e3e550b",
    name: "Dao Van Dat",
    email: "daovandat2k15@gmail.com",
    phone: "0384981035",
    phase: "New_Lead",
    applied_position: "Project Manager",
    cv_link: "https://dqnjtkbxtscjikalkajq.supabase.co/storage/v1/object/public/cv/public/be589060-d7e9-4ad6-b32d-38ce98dcf2a6/37499381-a7fe-4bf1-9df8-3749f56f478f-dao_van_dat_project_manager_cv.pdf",
    address: null,
    location: "Yen Nghia, Ha Dong, Hà Nội"
  }
]
