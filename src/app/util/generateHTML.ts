export const generateHTML = (data: any) => `
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; color: #000; }
      h1, h2, h3 { margin: 0; padding: 0; }
      .header { background-color: #11265e; color: white; padding: 20px; text-align: center; }
      .section-title { background-color: #11265e; color: white; padding: 10px; }
      table { width: 100%; border-spacing: 0 8px; }
      td { padding: 2px 6px; vertical-align: top; }
      .signature { text-align: right; margin-top: 40px; font-weight: bold; }
    </style>
  </head>
  <body>
    <div class="header">
      <img src="https://backend-beryl-sigma-47.vercel.app/logo.png" style="height:60px;" />
      <h1>Pan-Asia International School</h1>
      <h2>Enrollment Form</h2>
    </div>

    <h3 class="section-title">Student Information</h3>
    <table>
      ${infoRow('First Name', data.firstName)}
      ${infoRow('Middle Name', data.middleName)}
      ${infoRow('Last Name', data.lastName)}
      ${infoRow('Nick Name', data.nickName)}
      ${infoRow('Gender', data.gender)}
      ${infoRow('Nationality', data.nationality)}
      ${infoRow('Phone', data.phone)}
      ${infoRow('Email', data.email)}
      ${infoRow('Address', data.address)}
      ${infoRow('Grade Applying For', data.gradeApplyingFor)}
      ${infoRow('Year Applying For', data.yearApplyingFor)}
      ${infoRow('Current School Name', data.currentSchoolName)}
    </table>

    <h3 class="section-title">Parent/Guardian Information</h3>
    <table>
      ${infoRow('First Name', data.parentFirstName)}
      ${infoRow('Middle Name', data.parentMiddleName)}
      ${infoRow('Last Name', data.parentLastName)}
      ${infoRow('Relation', data.relation)}
      ${infoRow('Nationality', data.parentNationality)}
      ${infoRow('Phone', data.parentPhone)}
      ${infoRow('Email', data.parentEmail)}
      ${infoRow('Address', data.parentAddress)}
    </table>

    <h3 class="section-title">Additional Information</h3>
    <p><strong>Where did you hear from our school?</strong> ${data.comments || ''}</p>

    <p class="signature">Authorized’s Signature</p>
  </body>
  </html>
`;

const infoRow = (label: string, value: string) => `
  <tr><td><strong>${label}:</strong></td><td>${value || ''}</td></tr>
`;
