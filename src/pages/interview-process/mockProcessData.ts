// Mock data từ database - Process data với status thực tế
import type { ProcessStatus } from '../../constants/processStatus'
import type { CandidateInStage } from '../../store/useInterviewProcessStore'
import { mockCandidates } from '../candidates/mockData'

// Mock process data dựa trên data từ user
export interface MockProcessFromDB {
  id: string
  candidate_id: string
  job_id: string
  client_id: string
  process_status: ProcessStatus
  process_note: string | null
  application_reason: string | null
  candidate_phone: string
  candidate_email: string
  created_at: string
  updated_at: string
}

// Mock data từ user đã gửi
export const mockProcessesFromDB: MockProcessFromDB[] = [
  {
    id: "ac9a219d-b10d-4bea-a64c-b5a774596218",
    candidate_id: "406abdf3-0db5-4705-8881-de71cb0293f0",
    job_id: "e4949814-9abc-4699-98fb-22c0539373a3",
    client_id: "0365ed32-05de-4fdd-8cc2-1a0c055f5f80",
    process_status: "ONBOARDING",
    process_note: "UV đã onboard vào sáng thứ 3 (25/11/2025).",
    application_reason: "<p>Nguyễn Đăng Việt - 1977</p><p>Tốt nghiệp chuyên đại học chuyên ngành PCCC</p><p>1. Kinh nghiệm làm việc: 24 năm công tác trong lực lượng cảnh sát PCCC-CNCH TP. Hà Nội (1996 - 2019) + 6 năm đi làm ở các công ty trong lĩnh vực PCCC </p><p>2. Kỹ năng chuyên môn: </p><p>- Mạnh về thiết kế, thi công PCCC</p><p>- Bóc tách khối lượng theo bản vẽ thiết kế và hiện trạng công trình</p><p>- Giám sát, quản lí các tổ đội về nhân lực, giờ giấc, an toàn lao động, chất lượng thi công, tiến độ thi công, an ninh </p><p>công trường, tiện ích công trường &amp; Báo cáo định kỳ kết quả thực hiện về công ty.</p><p>- Chủ trì hồ sơ nghiệm thu về PCCC.</p><p>- Họp giao ban với Chủ đầu tư, TVGS và liên danh nhà thầu</p><p>3. Mức lương:</p><p>Mong muốn: 20tr net</p><p>4. Thời gian nhận việc: cuối tháng 11</p><p>5. Lý do ứng tuyển: hiện tại chỉ đi làm part-time những chỗ bạn bè giới thiệu, mong muốn tìm công việc full-time ổn định.</p><p></p>",
    candidate_phone: "0867087858",
    candidate_email: "nguyendangviet77@gmail.com",
    created_at: "2025-11-13 04:40:28.788894+00",
    updated_at: "2025-11-25 06:12:49.937187+00"
  },
  {
    id: "d6fdca4a-4bdf-4051-a479-fdf51a70c556",
    candidate_id: "0c54394a-2c2f-47b7-b6f3-25038323faa7",
    job_id: "e4949814-9abc-4699-98fb-22c0539373a3",
    client_id: "0365ed32-05de-4fdd-8cc2-1a0c055f5f80",
    process_status: "REJECTED_BY_CLIENT",
    process_note: "Khách cảm thấy chưa hợp nên từ chối",
    application_reason: "<p>Nguyễn Ngọc Sơn - 1994</p><p>1. Kinh nghiệm làm việc: 7 năm kinh nghiệm trong lĩnh vực PCCC </p><p>2. Kỹ năng chuyên môn: </p><p>- Thiên về thiết kế</p><p>- Bóc tách khối lượng từ bản vẽ thiết kế thi công xây dựng phục vụ công tác kinh doanh. </p><p>- Giám sát, hỗ trợ quản lý thi công và hỗ trợ công tác hồ sơ cho các công trình.</p><p>- Làm việc với nhà thầu, chủ đầu tư và các bộ phận liên quan.</p><p>3. Mức lương:</p><p>Hiện tại: 16tr net + thưởng, phụ cấp</p><p>Mong muốn: 18tr net + thưởng</p><p>4. Thời gian nhận việc: có thể đi làm luôn</p><p>5. Lý do ứng tuyển: công ty cũ nợ lương nên mong muốn tìm được công ty có thể trả lương đúng hạn và gắn bó lâu dài.</p>",
    candidate_phone: "0962629923",
    candidate_email: "sonkd94@gmail.com",
    created_at: "2025-11-20 10:40:35.340102+00",
    updated_at: "2025-11-25 06:13:52.933+00"
  },
  {
    id: "fd8cabff-828e-49f0-b67b-be6d922e9c19",
    candidate_id: "72eb4099-d5a6-4854-b816-f33a26d2aaf7",
    job_id: "e4949814-9abc-4699-98fb-22c0539373a3",
    client_id: "0365ed32-05de-4fdd-8cc2-1a0c055f5f80",
    process_status: "PROCESS_CANCELLED",
    process_note: "UV bảo bận nên muốn dừng process.",
    application_reason: "<p>Nguyễn Đình Thịnh - 2001</p><p>Tốt nghiệp ĐH xây dựng Hà Nội - ngành hệ thống kỹ thuật trong công trình</p><p>1. Kinh nghiệm làm việc: gần 1 năm làm việc trong lĩnh vực pccc</p><p>2. Kỹ năng chuyên môn: </p><p>- Thiên về thiết kế (Khảo sát dự án -&gt; Lên phương án thiết kế, lên khối lượng -&gt; Tư vấn thiết kế)</p><p>- Đã từng làm các công việc: Giám sát tổ đội thi công -&gt; Nghiệm thu khối lượng -&gt; Báo cáo về công ty</p><p>- Thành thạo AutoCAD, Excel, Word</p><p>3. Mức lương:</p><p>Hiện tại: 13tr net + thưởng khối lượng + thưởng dự án</p><p>Mong muốn: trao đổi trong lúc phỏng vấn khi biết rõ khối lượng công việc</p><p>4. Thời gian nhận việc: nửa tháng kể từ khi có offer.</p><p>5. Lý do ứng tuyển: Công ty hiện tại chỉ làm những công trình nhỏ, mong muốn được làm những công trình lớn.</p><p>6. Thông tin thêm: muốn phỏng vấn vào Thứ 7.</p><p></p>",
    candidate_phone: "0913389945",
    candidate_email: "thinhprond01@gmail.com",
    created_at: "2025-11-06 02:32:59.657426+00",
    updated_at: "2025-11-20 10:28:56.659778+00"
  }
]

// Helper function để convert mock process data thành CandidateInStage
export const convertProcessToCandidateInStage = (process: MockProcessFromDB): CandidateInStage | null => {
  const candidate = mockCandidates.find(c => 
    c.email === process.candidate_email || 
    c.phone === process.candidate_phone
  )

  if (!candidate) {
    // Nếu không tìm thấy trong mockCandidates, tạo từ process data
    return {
      id: process.candidate_id,
      name: process.candidate_email.split('@')[0], // Fallback name
      email: process.candidate_email,
      phone: process.candidate_phone,
      position: null,
      cv_link: '',
      location: null,
      address: null,
      note: process.process_note || '',
      process_status: process.process_status
    }
  }

  return {
    id: candidate.id,
    name: candidate.name,
    email: candidate.email,
    phone: candidate.phone,
    position: candidate.applied_position,
    cv_link: candidate.cv_link,
    location: candidate.location,
    address: candidate.address,
    note: process.process_note || '',
    process_status: process.process_status
  }
}

