import { LegalDocument } from '../types/legal';

export const SAMPLE_RENTAL_AGREEMENT: LegalDocument = {
  id: 'sample-rental-agreement-01',
  name: 'Residential_Rental_Agreement_Indiranagar.pdf',
  uploadedAt: new Date().toISOString(),
  metadata: {
    fileName: 'Residential_Rental_Agreement_Indiranagar.pdf',
    fileSize: 48200,
    fileType: 'pdf',
    pageCount: 4,
    wordCount: 1420,
    characterCount: 8900,
    detectedType: 'rental_agreement',
    jurisdictionHint: 'Karnataka, India (Subject to Karnataka Rent Control Act / Model Tenancy Act)',
    parsedAt: new Date().toISOString(),
  },
  rawText: `RESIDENTIAL LEASE AGREEMENT

This Agreement of Lease is made on this 1st day of April, 2025 at Bengaluru, Karnataka.

BETWEEN:
Mr. R. K. Sharma, residing at #104, 12th Main, HAL 2nd Stage, Indiranagar, Bengaluru (hereinafter called the "LESSOR", which expression shall include his legal heirs and assigns);
AND
Ms. Ananya Sen, working at Apex Technologies Pvt Ltd, Bengaluru (hereinafter called the "LESSEE").

WHEREAS the Lessor is the absolute owner of the residential flat located at Flat 302, Palm Heights, 100 Feet Road, Indiranagar, Bengaluru - 560038.

NOW THIS AGREEMENT WITNESSETH AS FOLLOWS:

1. TERM AND TENURE
The lease shall be for an initial period of 11 (eleven) months commencing from 1st April 2025. There shall be a mandatory lock-in period of 6 (six) months during which the Lessee cannot vacate the premises. If the Lessee vacates prior to the lock-in period, the entire security deposit shall stand forfeited automatically.

2. MONTHLY RENT AND MAINTENANCE
The Lessee agrees to pay a monthly rent of Rs. 42,000/- (Rupees Forty-Two Thousand only) payable on or before the 5th of each English calendar month. Late payment will attract an interest penalty of 24% per annum compounded monthly. Society maintenance charges of Rs. 6,500/- per month shall be paid directly by the Lessee.

3. SECURITY DEPOSIT
The Lessee has deposited a sum of Rs. 3,500,000/- (Rupees Three Lakhs Fifty Thousand only) as interest-free refundable security deposit. Upon vacating, the Lessor shall deduct 1 full month rent towards painting and refurbishment charges regardless of premises condition, and refund the balance within 90 days after inspection.

4. MAINTENANCE, REPAIRS AND ALTERATIONS
The Lessee shall bear all costs of internal minor and major repairs including plumbing, electrical fixtures, seepage repairs, and AC servicing. The Lessor retains the right to inspect the premises at any time without prior written notice.

5. TERMINATION AND NOTICE PERIOD
The Lessor may terminate this tenancy by issuing 15 days written notice for any reason whatsoever. The Lessee must provide at least 2 full calendar months written notice after the expiry of the lock-in period. If the Lessee fails to vacate after notice, Lessee shall pay liquidated damages of Rs. 5,000 per day.

6. RESTRICTIONS AND CONDUCT
The Lessee shall not accommodate any guests or relatives for more than 3 consecutive days without prior written consent of the Lessor. No pets of any nature are permitted on the premises. Cooking of non-vegetarian food is strictly prohibited inside the flat.

7. GOVERNING LAW AND JURISDICTION
This agreement shall be governed solely by the courts of Bengaluru. Any dispute shall be referred to a sole arbitrator appointed exclusively by the Lessor, whose decision shall be binding and non-appealable.`,
  clauses: [
    {
      id: 'c1',
      clauseNumber: '1',
      title: 'Term, Tenure and Lock-in Period',
      sectionPath: 'Section 1 > Term and Tenure',
      rawText: 'The lease shall be for an initial period of 11 (eleven) months commencing from 1st April 2025. There shall be a mandatory lock-in period of 6 (six) months during which the Lessee cannot vacate the premises. If the Lessee vacates prior to the lock-in period, the entire security deposit shall stand forfeited automatically.',
      plainLanguageSummary: 'You are renting for 11 months, but you are strictly locked in for the first 6 months. If you move out early for any reason, the landlord takes your entire ₹3.5 Lakh deposit.',
      simplifiedReadabilityScore: 7.2,
      riskLevel: 'high',
      riskCategory: 'termination',
      isStandardClause: true,
      unusualAspects: ['Total forfeiture of ₹3.5 Lakh deposit for early exit is legally disproportionate and penal under Section 74 of the Indian Contract Act.'],
      indianLawReference: 'Section 74, Indian Contract Act 1872 (Stipulation for penalty)',
      obligations: [
        {
          id: 'ob1',
          clauseId: 'c1',
          sectionReference: 'Section 1',
          party: 'user',
          description: 'Must remain in property for minimum 6 months or lose full deposit',
          deadlineOrTrigger: 'First 6 months of lease',
          priority: 'critical',
        },
      ],
      rights: [],
    },
    {
      id: 'c2',
      clauseNumber: '2',
      title: 'Monthly Rent, Due Date and Usurious Late Penalty',
      sectionPath: 'Section 2 > Monthly Rent and Maintenance',
      rawText: 'The Lessee agrees to pay a monthly rent of Rs. 42,000/- (Rupees Forty-Two Thousand only) payable on or before the 5th of each English calendar month. Late payment will attract an interest penalty of 24% per annum compounded monthly. Society maintenance charges of Rs. 6,500/- per month shall be paid directly by the Lessee.',
      plainLanguageSummary: 'Rent is ₹42,000 due by the 5th, plus ₹6,500 maintenance. If you are even a few days late, you face an extreme 24% annual interest compounded monthly.',
      simplifiedReadabilityScore: 6.8,
      riskLevel: 'medium',
      riskCategory: 'financial',
      isStandardClause: true,
      unusualAspects: ['24% compounding monthly interest rate is excessively harsh compared to statutory commercial rates (12-18%).'],
      obligations: [
        {
          id: 'ob2',
          clauseId: 'c2',
          sectionReference: 'Section 2',
          party: 'user',
          description: 'Pay ₹42,000 rent before 5th of each month + ₹6,500 maintenance',
          deadlineOrTrigger: '5th of every calendar month',
          priority: 'critical',
        },
      ],
      rights: [],
    },
    {
      id: 'c3',
      clauseNumber: '3',
      title: 'Security Deposit Deductions & 90-Day Refund Delay',
      sectionPath: 'Section 3 > Security Deposit',
      rawText: 'The Lessee has deposited a sum of Rs. 3,500,000/- (Rupees Three Lakhs Fifty Thousand only) as interest-free refundable security deposit. Upon vacating, the Lessor shall deduct 1 full month rent towards painting and refurbishment charges regardless of premises condition, and refund the balance within 90 days after inspection.',
      plainLanguageSummary: 'The landlord holds ₹3.5 Lakhs. When you leave, they will automatically deduct ₹42,000 for painting even if you leave the walls spotless, and take up to 3 months (90 days) to return your remaining money.',
      simplifiedReadabilityScore: 7.0,
      riskLevel: 'critical',
      riskCategory: 'financial',
      isStandardClause: false,
      unusualAspects: [
        'Mandatory 1-month painting deduction regardless of actual wear and tear is predatory.',
        '90-day refund window is unusually long; Karnataka standard practice is 7 to 30 days upon key handover.',
      ],
      obligations: [
        {
          id: 'ob3',
          clauseId: 'c3',
          sectionReference: 'Section 3',
          party: 'counterparty',
          description: 'Landlord must refund security deposit balance minus painting within 90 days of vacating',
          deadlineOrTrigger: '90 days after inspection',
          priority: 'important',
        },
      ],
      rights: [],
    },
    {
      id: 'c4',
      clauseNumber: '4',
      title: 'Unannounced Entry & Major Repairs Burden',
      sectionPath: 'Section 4 > Maintenance, Repairs and Alterations',
      rawText: 'The Lessee shall bear all costs of internal minor and major repairs including plumbing, electrical fixtures, seepage repairs, and AC servicing. The Lessor retains the right to inspect the premises at any time without prior written notice.',
      plainLanguageSummary: 'You are forced to pay for structural/major repairs like wall seepage and electrical failures which should be the landlord’s duty. Additionally, the landlord can enter your home anytime without warning, violating your privacy.',
      simplifiedReadabilityScore: 7.5,
      riskLevel: 'critical',
      riskCategory: 'liability',
      isStandardClause: false,
      unusualAspects: [
        'Structural repairs (seepage) are legally the lessor obligation under standard property law.',
        'Entry without reasonable prior notice (typically 24 hours) violates right to quiet enjoyment.',
      ],
      obligations: [
        {
          id: 'ob4',
          clauseId: 'c4',
          sectionReference: 'Section 4',
          party: 'user',
          description: 'Tenant responsible for minor and major repairs including seepage',
          priority: 'important',
        },
      ],
      rights: [],
    },
    {
      id: 'c5',
      clauseNumber: '5',
      title: 'Asymmetric Termination & Liquidated Damages',
      sectionPath: 'Section 5 > Termination and Notice Period',
      rawText: 'The Lessor may terminate this tenancy by issuing 15 days written notice for any reason whatsoever. The Lessee must provide at least 2 full calendar months written notice after the expiry of the lock-in period. If the Lessee fails to vacate after notice, Lessee shall pay liquidated damages of Rs. 5,000 per day.',
      plainLanguageSummary: 'The landlord can kick you out with only 15 days notice, but you have to give 2 whole months notice. If you stay a day late, you are charged a crushing ₹5,000 daily penalty (₹1.5 Lakh/month).',
      simplifiedReadabilityScore: 6.9,
      riskLevel: 'critical',
      riskCategory: 'termination',
      isStandardClause: false,
      unusualAspects: [
        'Gross asymmetry: 15 days notice for landlord vs 60 days for tenant.',
        '₹5,000/day overstay fine is over 3.5x normal daily rent (₹1,400/day).',
      ],
      obligations: [],
      rights: [],
    },
    {
      id: 'c6',
      clauseNumber: '6',
      title: 'Strict Guest & Dietary Restrictions',
      sectionPath: 'Section 6 > Restrictions and Conduct',
      rawText: 'The Lessee shall not accommodate any guests or relatives for more than 3 consecutive days without prior written consent of the Lessor. No pets of any nature are permitted on the premises. Cooking of non-vegetarian food is strictly prohibited inside the flat.',
      plainLanguageSummary: 'Your guests cannot stay longer than 3 days without landlord permission, pets are banned, and you are forbidden from cooking non-vegetarian food.',
      simplifiedReadabilityScore: 6.5,
      riskLevel: 'high',
      riskCategory: 'privacy_data',
      isStandardClause: false,
      unusualAspects: ['Dietary restriction and guest permission clauses infringe upon personal liberty and privacy inside a leased residential domicile.'],
      obligations: [],
      rights: [],
    },
    {
      id: 'c7',
      clauseNumber: '7',
      title: 'Unilateral Arbitrator Appointment',
      sectionPath: 'Section 7 > Governing Law and Jurisdiction',
      rawText: 'This agreement shall be governed solely by the courts of Bengaluru. Any dispute shall be referred to a sole arbitrator appointed exclusively by the Lessor, whose decision shall be binding and non-appealable.',
      plainLanguageSummary: 'If you have a legal fight, only the landlord picks the arbitrator/judge. (Note: Under Indian Supreme Court rulings, unilateral appointment of a sole arbitrator is legally invalid).',
      simplifiedReadabilityScore: 7.9,
      riskLevel: 'high',
      riskCategory: 'dispute_resolution',
      isStandardClause: false,
      unusualAspects: [
        'Unilateral appointment of a sole arbitrator is invalid per Perkins Eastman Architects DPC v. HSCC (India) Ltd (2019 Supreme Court).',
      ],
      indianLawReference: 'Section 12(5) read with Seventh Schedule, Arbitration and Conciliation Act 1996',
      obligations: [],
      rights: [],
    },
  ],
  risks: [
    {
      id: 'r1',
      clauseId: 'c3',
      clauseTitle: 'Security Deposit Deductions & 90-Day Delay',
      sectionPath: 'Section 3',
      severity: 'critical',
      category: 'financial',
      sourceQuote: 'deduct 1 full month rent towards painting and refurbishment charges regardless of premises condition, and refund the balance within 90 days',
      title: 'Mandatory Non-Refundable Painting Fee & 90-Day Hold',
      explanation: 'You lose ₹42,000 automatically on exit even if the property is in pristine condition. Waiting 90 days for deposit return will freeze your capital when moving to a new house.',
      practicalImpact: 'Loss of ₹42,000 + ₹3.5 Lakh trapped for 3 months.',
      recommendedAction: 'Counter-propose: Painting deduction only upon actual itemized bills if damaged beyond normal wear & tear; refund within 15 days of key handover.',
      suggestedNegotiationRedline: 'The Lessor shall refund the complete security deposit within 15 (fifteen) business days of vacating, subject to deductions only for actual documented damages beyond reasonable wear and tear.',
    },
    {
      id: 'r2',
      clauseId: 'c4',
      clauseTitle: 'Unannounced Entry & Major Repairs Burden',
      sectionPath: 'Section 4',
      severity: 'critical',
      category: 'liability',
      sourceQuote: 'Lessee shall bear all costs of internal minor and major repairs including plumbing, electrical fixtures, seepage repairs... Lessor retains the right to inspect at any time without prior written notice',
      title: 'Structural Repair Liability & Loss of Privacy',
      explanation: 'Seepage repairs can cost tens of thousands of rupees and are landlord structural obligations. Unlimited entry without notice destroys your domestic privacy.',
      practicalImpact: 'Potential sudden repair expenses of ₹50,000+ and landlord arriving at any hour.',
      recommendedAction: 'Demand 24-hour advance written notice for inspections during reasonable daytime hours, and limit tenant responsibility to minor repairs under ₹1,000.',
      suggestedNegotiationRedline: 'Lessor shall be solely responsible for all structural, plumbing, and seepage repairs. Lessor may inspect premises only upon giving at least 24 hours prior written notice during reasonable daylight hours.',
    },
    {
      id: 'r3',
      clauseId: 'c5',
      clauseTitle: 'Asymmetric Termination & Liquidated Damages',
      sectionPath: 'Section 5',
      severity: 'critical',
      category: 'termination',
      sourceQuote: 'Lessor may terminate... 15 days written notice... Lessee must provide at least 2 full calendar months... liquidated damages of Rs. 5,000 per day',
      title: 'One-Sided 15-Day Eviction vs 60-Day Tenant Notice',
      explanation: 'You can be forced out with almost no time to find new accommodation, while you are burdened with giving 2 months notice.',
      practicalImpact: 'Risk of sudden displacement or forced double-rent payment.',
      recommendedAction: 'Make notice periods mutual (e.g. 1 month for both parties) and reduce delay damages to normal prorated rent.',
    },
    {
      id: 'r4',
      clauseId: 'c1',
      clauseTitle: 'Term, Tenure and Lock-in Period',
      sectionPath: 'Section 1',
      severity: 'high',
      category: 'financial',
      sourceQuote: 'mandatory lock-in period of 6 months... entire security deposit shall stand forfeited automatically',
      title: 'Disproportionate Deposit Forfeiture on Early Relocation',
      explanation: 'If your employer transfers you or a family emergency arises in months 1-6, you lose ₹3.5 Lakhs entirely.',
      practicalImpact: 'Total forfeiture of ₹3,50,000.',
      recommendedAction: 'Limit early exit liability to 1 month rent or allow finding a replacement tenant.',
    },
    {
      id: 'r5',
      clauseId: 'c7',
      clauseTitle: 'Unilateral Arbitrator Appointment',
      sectionPath: 'Section 7',
      severity: 'high',
      category: 'dispute_resolution',
      sourceQuote: 'Any dispute shall be referred to a sole arbitrator appointed exclusively by the Lessor',
      title: 'Unenforceable Unilateral Arbitration Clause',
      explanation: 'Clause attempts to give landlord absolute power over dispute resolution. While legally void under Indian arbitration law, it creates litigation hurdles.',
      practicalImpact: 'Biased arbitration proceeding in case of deposit dispute.',
      recommendedAction: 'Specify mutually agreed arbitrator or standard jurisdiction of local civil courts.',
      legalBasisOrJurisdictionNotice: 'Arbitration and Conciliation Act 1996, Section 12(5); Perkins Eastman (2019) SCC.',
    },
  ],
  summary: {
    executiveSummary: 'This is a standard 11-month residential lease for a flat in Indiranagar, Bengaluru, but it contains several heavily one-sided clauses favoring the landlord. Most notably, it imposes an automatic ₹42,000 painting deduction from your ₹3.5 Lakh deposit, requires 90 days for deposit return, allows the landlord unannounced entry, makes you liable for structural seepage, and grants the landlord a 15-day termination right while requiring you to give 2 months notice.',
    overallRiskScore: 78,
    overallRiskSeverity: 'critical',
    totalClauses: 7,
    criticalRisksCount: 3,
    highRisksCount: 2,
    mediumRisksCount: 1,
    lowRisksCount: 0,
    keyTerms: [
      {
        term: 'Lock-in Period',
        definedInClause: 'Section 1',
        legalMeaning: 'A fixed duration during which neither party can terminate the agreement without paying a contractual penalty.',
        plainEnglishExplanation: 'A freeze period where you cannot leave the flat even if your circumstances change.',
        whyItMattersToYou: 'Exiting early triggers the forfeiture of your entire ₹3.5 Lakh deposit.',
      },
      {
        term: 'Liquidated Damages',
        definedInClause: 'Section 5',
        legalMeaning: 'A pre-estimated sum of damages specified in a contract to be paid upon breach.',
        plainEnglishExplanation: 'A pre-set daily fine of ₹5,000 charged if you do not hand over keys immediately.',
        whyItMattersToYou: 'Far exceeds actual rent (approx ₹1,400/day) and can accumulate quickly.',
      },
      {
        term: 'Sole Arbitrator',
        definedInClause: 'Section 7',
        legalMeaning: 'A private neutral adjudicator appointed to settle disputes outside regular courts.',
        plainEnglishExplanation: 'A private judge picked solely by the landlord to decide disputes.',
        whyItMattersToYou: 'Risk of bias; though legally unenforceable in India without mutual consent.',
      },
    ],
    obligationsSummary: {
      userCount: 5,
      counterpartyCount: 2,
      topObligations: [
        {
          id: 'ob1',
          clauseId: 'c1',
          sectionReference: 'Section 1',
          party: 'user',
          description: 'Stay for minimum 6 months or forfeit deposit',
          priority: 'critical',
        },
        {
          id: 'ob2',
          clauseId: 'c2',
          sectionReference: 'Section 2',
          party: 'user',
          description: 'Pay ₹42,000 rent + ₹6,500 maintenance by 5th',
          priority: 'critical',
        },
      ],
    },
    checklist: [
      {
        id: 'chk1',
        category: 'before_signing',
        action: 'Negotiate deposit refund timeline from 90 days down to 15 days post-handover.',
        sourceSection: 'Section 3',
        priority: 'must_do',
        completed: false,
      },
      {
        id: 'chk2',
        category: 'before_signing',
        action: 'Remove clause requiring mandatory 1-month rent deduction for painting.',
        sourceSection: 'Section 3',
        priority: 'must_do',
        completed: false,
      },
      {
        id: 'chk3',
        category: 'before_signing',
        action: 'Add 24-hour advance notice requirement before landlord enters premises.',
        sourceSection: 'Section 4',
        priority: 'must_do',
        completed: false,
      },
      {
        id: 'chk4',
        category: 'before_signing',
        action: 'Equalize notice periods to 1 month mutual notice for both parties.',
        sourceSection: 'Section 5',
        priority: 'must_do',
        completed: false,
      },
      {
        id: 'chk5',
        category: 'record_keeping',
        action: 'Conduct photo/video walkthrough of flat on day 1 to document pre-existing wear and tear.',
        sourceSection: 'Section 3 & 4',
        priority: 'must_do',
        completed: false,
      },
    ],
    lawyerPrepGuide: [
      {
        id: 'lp1',
        topic: 'Deposit Refund & Illegal Deduction',
        specificClauseReference: 'Section 3',
        suggestedQuestion: 'Is the mandatory 1-month painting deduction enforceable under Karnataka rent laws if the premises are repainted or kept clean by tenant?',
        contextWhyAsk: 'The landlord is attempting to guarantee ₹42,000 deduction regardless of condition.',
        documentsToBring: ['Lease draft', 'Initial inspection condition sheet', 'Deposit bank transfer receipt'],
        targetOutcome: 'A negotiated redline clause tying deductions only to proven damage.',
      },
      {
        id: 'lp2',
        topic: 'Unilateral Arbitrator Clause Enforceability',
        specificClauseReference: 'Section 7',
        suggestedQuestion: 'How does the Perkins Eastman Supreme Court ruling protect me against Section 7 if a deposit dispute arises?',
        contextWhyAsk: 'To confirm that the landlord cannot appoint their own acquaintance as sole arbitrator.',
        documentsToBring: ['Draft lease Section 7 copy'],
        targetOutcome: 'Replacement with standard jurisdiction of Bengaluru Civil Courts or mutual appointment.',
      },
    ],
  },
};

export const SAMPLE_EMPLOYMENT_CONTRACT: LegalDocument = {
  id: 'sample-employment-agreement-02',
  name: 'Senior_Software_Engineer_Offer_Employment.pdf',
  uploadedAt: new Date().toISOString(),
  metadata: {
    fileName: 'Senior_Software_Engineer_Offer_Employment.pdf',
    fileSize: 61400,
    fileType: 'pdf',
    pageCount: 6,
    wordCount: 2280,
    characterCount: 14500,
    detectedType: 'employment_contract',
    jurisdictionHint: 'Republic of India (Subject to Indian Contract Act 1872, Shops & Establishments Act)',
    parsedAt: new Date().toISOString(),
  },
  rawText: `EMPLOYMENT AGREEMENT & INTELLECTUAL PROPERTY ASSIGNMENT

This Employment Agreement is entered into on 15th January 2025 by and between:
NovaCloud Infotech India Pvt. Ltd. (hereinafter "Company");
AND
Vikram Aditya (hereinafter "Employee").

1. POSITION AND PROBATION
Employee is appointed as Lead AI Architect. Probation period shall be 6 (six) months, extendable at sole discretion of the Company. During probation, Company may terminate employment with 7 days notice without assigning reason.

2. NOTICE PERIOD AND BUYOUT
Post confirmation, Employee must provide 90 (ninety) days written notice of resignation. Company retains sole discretion whether to accept salary in lieu of notice. If Employee fails to serve full 90 days, Company shall withhold experience letter and all relieving documents.

3. POST-TERMINATION NON-COMPETE COVENANT
For a period of 24 (twenty-four) months following cessation of employment for any reason, Employee shall NOT directly or indirectly engage with, consult for, advise, invest in, or be employed by any enterprise that operates in cloud computing, AI, or SaaS software anywhere globally.

4. INTELLECTUAL PROPERTY ASSIGNMENT
Employee hereby assigns to the Company all rights, title, and interest in and to any and all inventions, code, designs, algorithms, patentable concepts, and copyrightable works created by Employee during the entire tenure of employment, whether created during office hours, on personal computers, on weekends, or unrelated to Company business.

5. UNLIMITED INDEMNITY
Employee agrees to indemnify, defend, and hold harmless the Company, its directors, officers, and clients from any and all damages, claims, losses, legal costs, and third-party liabilities arising directly or indirectly from Employee's code contributions or alleged negligence.

6. NON-SOLICITATION AND LIQUIDATED DAMAGES
Employee shall not solicit any Company client or employee for 36 months. Breach of this clause shall result in liquidated damages payable by Employee equal to two years of gross CTC.`,
  clauses: [
    {
      id: 'ec1',
      clauseNumber: '1',
      title: 'Probation Period and Discretionary Extension',
      sectionPath: 'Section 1 > Position and Probation',
      rawText: 'Employee is appointed as Lead AI Architect. Probation period shall be 6 (six) months, extendable at sole discretion of the Company. During probation, Company may terminate employment with 7 days notice without assigning reason.',
      plainLanguageSummary: 'You start on a 6-month probation that the company can extend indefinitely. During this time, they can fire you on just 7 days notice without any explanation.',
      simplifiedReadabilityScore: 7.4,
      riskLevel: 'medium',
      riskCategory: 'termination',
      isStandardClause: true,
      obligations: [],
      rights: [],
    },
    {
      id: 'ec2',
      clauseNumber: '2',
      title: '90-Day Resignation Notice & Relieving Letter Withholding',
      sectionPath: 'Section 2 > Notice Period and Buyout',
      rawText: 'Post confirmation, Employee must provide 90 (ninety) days written notice of resignation. Company retains sole discretion whether to accept salary in lieu of notice. If Employee fails to serve full 90 days, Company shall withhold experience letter and all relieving documents.',
      plainLanguageSummary: 'You have a 3-month (90 days) notice period. The company can refuse to let you buy out your notice, and threatens to withhold your experience and relieving letters if you leave earlier.',
      simplifiedReadabilityScore: 7.1,
      riskLevel: 'high',
      riskCategory: 'termination',
      isStandardClause: true,
      unusualAspects: ['Withholding service/relieving certificates has been held contrary to fair labor standards in multiple Indian High Court rulings.'],
      obligations: [],
      rights: [],
    },
    {
      id: 'ec3',
      clauseNumber: '3',
      title: '24-Month Global Post-Employment Non-Compete',
      sectionPath: 'Section 3 > Post-Termination Non-Compete Covenant',
      rawText: 'For a period of 24 (twenty-four) months following cessation of employment for any reason, Employee shall NOT directly or indirectly engage with, consult for, advise, invest in, or be employed by any enterprise that operates in cloud computing, AI, or SaaS software anywhere globally.',
      plainLanguageSummary: 'The company tries to ban you from working in AI or Cloud anywhere in the world for 2 whole years after you leave. In India, this is 100% VOID under Section 27 of the Indian Contract Act.',
      simplifiedReadabilityScore: 7.8,
      riskLevel: 'critical',
      riskCategory: 'non_compete',
      isStandardClause: false,
      unusualAspects: [
        'Post-employment non-compete covenants are completely VOID and unenforceable in India under Section 27 of the Indian Contract Act 1872 (Niranjan Shankar Golikari v. Century Spg & Mfg Co, Percept D’Mark v. Zaheer Khan).',
      ],
      indianLawReference: 'Section 27, Indian Contract Act 1872 (Agreement in restraint of trade, void)',
      obligations: [],
      rights: [],
    },
    {
      id: 'ec4',
      clauseNumber: '4',
      title: 'Overreaching IP Assignment Covering Personal Weekend Projects',
      sectionPath: 'Section 4 > Intellectual Property Assignment',
      rawText: 'Employee hereby assigns to the Company all rights, title, and interest in and to any and all inventions, code, designs, algorithms, patentable concepts, and copyrightable works created by Employee during the entire tenure of employment, whether created during office hours, on personal computers, on weekends, or unrelated to Company business.',
      plainLanguageSummary: 'The company claims ownership of everything you write or build—even your personal weekend hobby projects, apps made on your own laptop, and ideas totally unrelated to your job.',
      simplifiedReadabilityScore: 7.6,
      riskLevel: 'critical',
      riskCategory: 'ip_rights',
      isStandardClause: false,
      unusualAspects: ['Claiming ownership over personal inventions created on private hardware outside business hours without using company IP.'],
      obligations: [],
      rights: [],
    },
    {
      id: 'ec5',
      clauseNumber: '5',
      title: 'Personal Unlimited Indemnity for Employee Code',
      sectionPath: 'Section 5 > Unlimited Indemnity',
      rawText: 'Employee agrees to indemnify, defend, and hold harmless the Company, its directors, officers, and clients from any and all damages, claims, losses, legal costs, and third-party liabilities arising directly or indirectly from Employee\'s code contributions or alleged negligence.',
      plainLanguageSummary: 'If code you write ever causes a bug, system outage, or client lawsuit, the company expects YOU to personally pay all the company’s legal fees and damages out of your own pocket.',
      simplifiedReadabilityScore: 8.0,
      riskLevel: 'critical',
      riskCategory: 'indemnification',
      isStandardClause: false,
      unusualAspects: ['Employees are agents of the employer and should not carry personal unlimited indemnity for work product produced in good faith.'],
      obligations: [],
      rights: [],
    },
  ],
  risks: [
    {
      id: 'er1',
      clauseId: 'ec3',
      clauseTitle: '24-Month Global Non-Compete',
      sectionPath: 'Section 3',
      severity: 'critical',
      category: 'non_compete',
      sourceQuote: 'For a period of 24 months... shall NOT directly or indirectly engage with... any enterprise that operates in cloud computing, AI, or SaaS',
      title: 'Restraint of Trade (Void Under Section 27, Indian Contract Act)',
      explanation: 'Under Indian law, employers cannot restrict an employee from earning a livelihood after their employment ends. This clause is void under Section 27, but companies use it to intimidate departing staff.',
      practicalImpact: 'Threat of frivolous legal notices if joining a competitor.',
      recommendedAction: 'Ask to strike out the post-employment non-compete entirely, or replace with standard non-solicitation of clients.',
      legalBasisOrJurisdictionNotice: 'Section 27, Indian Contract Act 1872; Supreme Court in Percept D’Mark (India) (P) Ltd. v. Zaheer Khan (2006).',
    },
    {
      id: 'er2',
      clauseId: 'ec4',
      clauseTitle: 'Overreaching IP Assignment',
      sectionPath: 'Section 4',
      severity: 'critical',
      category: 'ip_rights',
      sourceQuote: 'whether created during office hours, on personal computers, on weekends, or unrelated to Company business',
      title: 'Appropriation of Personal & Weekend Inventions',
      explanation: 'Grants the employer automatic title to your personal weekend code and independent open-source contributions.',
      practicalImpact: 'You forfeit ownership of any side project or startup prototype you build while employed.',
      recommendedAction: 'Amend clause to explicitly exclude inventions created outside working hours on personal devices without using company confidential information or resources.',
    },
    {
      id: 'er3',
      clauseId: 'ec5',
      clauseTitle: 'Unlimited Indemnity for Employee Code',
      sectionPath: 'Section 5',
      severity: 'critical',
      category: 'liability',
      sourceQuote: 'Employee agrees to indemnify, defend, and hold harmless the Company... from any and all damages... arising from Employee\'s code',
      title: 'Dangerous Personal Financial Liability for Software Bugs',
      explanation: 'Employers must carry commercial errors & omissions insurance. Passing third-party commercial liability directly onto an individual salaried employee is extreme.',
      practicalImpact: 'Catastrophic personal financial risk if production software has vulnerabilities.',
      recommendedAction: 'Delete indemnity clause entirely. Standard employment contracts never require individual engineers to indemnify employers.',
    },
  ],
  summary: {
    executiveSummary: 'This employment offer contains serious red flags including a 2-year post-termination non-compete clause (void under Indian law), claim of ownership over your personal weekend inventions, an unlimited personal indemnity for coding bugs, and a 90-day notice period with threats to withhold relieving letters. These clauses must be reviewed and redlined before signing.',
    overallRiskScore: 88,
    overallRiskSeverity: 'critical',
    totalClauses: 6,
    criticalRisksCount: 3,
    highRisksCount: 1,
    mediumRisksCount: 1,
    lowRisksCount: 0,
    keyTerms: [
      {
        term: 'Restraint of Trade',
        definedInClause: 'Section 3',
        legalMeaning: 'Any contractual restriction that prevents an individual from carrying on a lawful profession, trade, or business.',
        plainEnglishExplanation: 'A rule banning you from taking another tech job after leaving.',
        whyItMattersToYou: 'It is declared void by Indian law (Section 27 Contract Act).',
      },
      {
        term: 'Indemnity',
        definedInClause: 'Section 5',
        legalMeaning: 'An obligation to compensate another party for harm or loss sustained.',
        plainEnglishExplanation: 'A promise that you will pay the company’s legal fines and losses if your code fails.',
        whyItMattersToYou: 'You could be sued personally for thousands or lakhs of rupees.',
      },
    ],
    obligationsSummary: {
      userCount: 4,
      counterpartyCount: 1,
      topObligations: [],
    },
    checklist: [
      {
        id: 'ec_chk1',
        category: 'before_signing',
        action: 'Request complete deletion of Section 5 (Personal Indemnity).',
        sourceSection: 'Section 5',
        priority: 'must_do',
        completed: false,
      },
      {
        id: 'ec_chk2',
        category: 'before_signing',
        action: 'Carve out personal weekend projects and existing GitHub repositories from Section 4.',
        sourceSection: 'Section 4',
        priority: 'must_do',
        completed: false,
      },
      {
        id: 'ec_chk3',
        category: 'before_signing',
        action: 'Clarify Section 3 that non-compete terminates immediately upon end of employment.',
        sourceSection: 'Section 3',
        priority: 'must_do',
        completed: false,
      },
    ],
    lawyerPrepGuide: [
      {
        id: 'ec_lp1',
        topic: 'Personal Indemnification in Employment',
        specificClauseReference: 'Section 5',
        suggestedQuestion: 'How can we draft a polite redline removing employee indemnity without alarming HR?',
        contextWhyAsk: 'To ensure professional pushback while protecting against devastating liability.',
        documentsToBring: ['Offer letter', 'Job description'],
        targetOutcome: 'Clean replacement with standard company vicarious liability.',
      },
    ],
  },
};

export const SAMPLE_COMPARISON_TARGET: LegalDocument = {
  id: 'sample-rental-agreement-01-negotiated',
  name: 'Residential_Rental_Agreement_Indiranagar_REVISED_DRAFT.pdf',
  uploadedAt: new Date().toISOString(),
  metadata: {
    fileName: 'Residential_Rental_Agreement_Indiranagar_REVISED_DRAFT.pdf',
    fileSize: 49500,
    fileType: 'pdf',
    pageCount: 4,
    wordCount: 1460,
    characterCount: 9100,
    detectedType: 'rental_agreement',
    jurisdictionHint: 'Karnataka, India',
    parsedAt: new Date().toISOString(),
  },
  rawText: `REVISED RESIDENTIAL LEASE AGREEMENT (TENANT COUNTER-PROPOSAL)

1. TERM AND TENURE
The lease shall be for an initial period of 11 (eleven) months commencing from 1st April 2025. Lock-in period shall be 3 (three) months. In case of job transfer, early vacation shall be permitted upon 1 month notice without deposit penalty.

2. MONTHLY RENT AND MAINTENANCE
Rent is Rs. 42,000/- payable on or before 5th of each month. Late interest shall be standard 12% per annum simple interest.

3. SECURITY DEPOSIT
Security deposit of Rs. 3,500,000/- shall be refunded within 15 (fifteen) business days of vacating. Actual documented painting expenses shall only be deducted if tenant does not hand over painted walls.

4. REPAIRS AND INSPECTION
Lessor responsible for structural, seepage, and electrical main issues. Lessor may inspect premises only upon giving 24 hours prior written notice during daytime hours.

5. TERMINATION NOTICE
Both parties may terminate with mutual 1 (one) calendar month notice. Overstay damages shall be calculated at standard prorated daily rent.

6. CONDUCT
Tenant shall maintain peaceful residential enjoyment. Reasonable visitors permitted.`,
  clauses: [],
};

export const SAMPLE_NDA: LegalDocument = {
  id: 'sample-nda-03',
  name: 'Mutual_Non_Disclosure_Agreement_Biotech.pdf',
  uploadedAt: new Date().toISOString(),
  metadata: {
    fileName: 'Mutual_Non_Disclosure_Agreement_Biotech.pdf',
    fileSize: 34200,
    fileType: 'pdf',
    pageCount: 3,
    wordCount: 1150,
    characterCount: 7400,
    detectedType: 'nda',
    jurisdictionHint: 'Republic of India (Subject to Indian Contract Act 1872)',
    parsedAt: new Date().toISOString(),
  },
  rawText: `MUTUAL NON-DISCLOSURE AND PROPRIETARY INFORMATION AGREEMENT

This Mutual Non-Disclosure Agreement is executed on 12th February 2025 by and between:
Aura BioTech Pvt. Ltd., having its principal office in Mumbai, Maharashtra ("Disclosing Party");
AND
Zenith Therapeutics LLP ("Receiving Party").

1. SCOPE OF CONFIDENTIAL INFORMATION
Confidential Information includes all technical, business, financial, or scientific data disclosed whether marked confidential or not, including information disclosed orally without requiring subsequent written memorialization.

2. NON-DISCLOSURE AND EXCLUSIONS
The Receiving Party shall exercise the highest degree of care. The obligations shall not apply only if Receiving Party proves by clear and convincing documentary evidence that the information was already publicly known without breach.

3. DURATION AND PERPETUAL SURVIVAL
The confidentiality obligations under this Agreement shall survive the termination of discussions and shall remain in effect perpetually in perpetuity for all trade secrets and technical specifications, and for a period of 10 (ten) years for all commercial data.

4. RETURN AND IRREVOCABLE DESTRUCTION
Within 5 (five) calendar days of written request, Receiving Party shall irrevocably destroy all notes, analysis, backups, and computer records, with no exceptions permitted for automated disaster recovery backups or statutory compliance copies.

5. EQUITABLE RELIEF AND WAIVER OF BOND
Receiving Party acknowledges that any breach will cause irreparable injury for which monetary damages alone would be inadequate. Disclosing Party shall be entitled to an immediate ex-parte temporary restraining order and permanent injunction without the necessity of posting any bond or proof of actual financial damages.

6. LIQUIDATED DAMAGES FOR BREACH
In addition to injunctive relief, any disclosure in violation of Section 2 shall subject the Receiving Party to liquidated damages of Rs. 50,00,000/- (Rupees Fifty Lakhs) per incident, regardless of actual loss incurred.

7. GOVERNING LAW AND EXCLUSIVE JURISDICTION
This Agreement shall be governed exclusively by the laws of Maharashtra, India, with exclusive venue in the courts of Mumbai.`,
  clauses: [
    {
      id: 'nda_c1',
      clauseNumber: '1',
      title: 'Scope of Confidential Information',
      sectionPath: 'Section 1 > Scope of Confidential Information',
      rawText: 'Confidential Information includes all technical, business, financial, or scientific data disclosed whether marked confidential or not, including information disclosed orally without requiring subsequent written memorialization.',
      plainLanguageSummary: 'Anything shared—even offhand spoken remarks without any written record—is automatically deemed confidential.',
      simplifiedReadabilityScore: 7.8,
      riskLevel: 'medium',
      riskCategory: 'compliance',
      isStandardClause: false,
      obligations: [],
      rights: [],
    },
    {
      id: 'nda_c3',
      clauseNumber: '3',
      title: 'Duration and Perpetual Survival',
      sectionPath: 'Section 3 > Duration and Perpetual Survival',
      rawText: 'The confidentiality obligations under this Agreement shall survive the termination of discussions and shall remain in effect perpetually in perpetuity for all trade secrets and technical specifications, and for a period of 10 (ten) years for all commercial data.',
      plainLanguageSummary: 'You are bound forever on technical data and for 10 years on commercial details, which is unusually long for standard business discussions.',
      simplifiedReadabilityScore: 8.2,
      riskLevel: 'high',
      riskCategory: 'liability',
      isStandardClause: false,
      obligations: [],
      rights: [],
    },
    {
      id: 'nda_c5',
      clauseNumber: '5',
      title: 'Equitable Relief and Waiver of Bond',
      sectionPath: 'Section 5 > Equitable Relief and Waiver of Bond',
      rawText: 'Receiving Party acknowledges that any breach will cause irreparable injury for which monetary damages alone would be inadequate. Disclosing Party shall be entitled to an immediate ex-parte temporary restraining order and permanent injunction without the necessity of posting any bond or proof of actual financial damages.',
      plainLanguageSummary: 'The other party can obtain an immediate court injunction freezing your operations without proving financial harm or posting a security deposit with the court.',
      simplifiedReadabilityScore: 8.5,
      riskLevel: 'critical',
      riskCategory: 'liability',
      isStandardClause: false,
      obligations: [],
      rights: [],
    },
    {
      id: 'nda_c6',
      clauseNumber: '6',
      title: 'Liquidated Damages for Breach',
      sectionPath: 'Section 6 > Liquidated Damages for Breach',
      rawText: 'In addition to injunctive relief, any disclosure in violation of Section 2 shall subject the Receiving Party to liquidated damages of Rs. 50,00,000/- (Rupees Fifty Lakhs) per incident, regardless of actual loss incurred.',
      plainLanguageSummary: 'You face an automatic ₹50 Lakh fine for any disclosure, even accidental, regardless of whether any actual financial harm occurred.',
      simplifiedReadabilityScore: 7.9,
      riskLevel: 'critical',
      riskCategory: 'penalty',
      isStandardClause: false,
      indianLawReference: 'Section 74, Indian Contract Act 1872 (Stipulation of penalty requires proof of actual damage)',
      obligations: [],
      rights: [],
    },
  ],
  risks: [
    {
      id: 'r_nda_1',
      clauseId: 'nda_c6',
      clauseTitle: 'Liquidated Damages for Breach',
      sectionPath: 'Section 6',
      severity: 'critical',
      category: 'penalty',
      sourceQuote: 'subject the Receiving Party to liquidated damages of Rs. 50,00,000/- (Rupees Fifty Lakhs) per incident, regardless of actual loss incurred',
      title: 'Severe ₹50 Lakh Penalty Without Proof of Actual Loss',
      explanation: 'Under Indian law (Section 74 Contract Act), liquidated damages cannot serve as a punitive in terrorem penalty without reasonable pre-estimate of genuine damage.',
      practicalImpact: 'Immediate exposure to a ₹50,00,000 claim even for minor inadvertent disclosures.',
      recommendedAction: 'Remove fixed liquidated damages; replace with liability for actual, proven, direct compensatory losses only.',
      suggestedNegotiationRedline: 'In the event of a material breach, the Receiving Party shall be liable only for direct, proven damages established in a court of competent jurisdiction.',
      legalBasisOrJurisdictionNotice: 'Section 74 Indian Contract Act 1872; Kailash Nath Associates v. DDA (2015 Supreme Court).',
    },
    {
      id: 'r_nda_2',
      clauseId: 'nda_c5',
      clauseTitle: 'Equitable Relief and Waiver of Bond',
      sectionPath: 'Section 5',
      severity: 'high',
      category: 'liability',
      sourceQuote: 'without the necessity of posting any bond or proof of actual financial damages',
      title: 'Unilateral Injunction Without Security Bond',
      explanation: 'Waives court requirement for the disclosing party to post security when seeking emergency injunctions.',
      practicalImpact: 'Your ongoing commercial projects could be frozen ex-parte without financial safeguards.',
      recommendedAction: 'Strike out "without the necessity of posting any bond".',
    },
  ],
  summary: {
    executiveSummary: 'This Mutual Non-Disclosure Agreement includes aggressive terms including a ₹50,00,000 liquidated damages clause per incident without requiring proof of loss, perpetual confidentiality on technical data, waiver of court injunction bonds, and coverage of oral disclosures without written confirmation. Key liability caps should be established before signing.',
    overallRiskScore: 84,
    overallRiskSeverity: 'critical',
    totalClauses: 7,
    criticalRisksCount: 2,
    highRisksCount: 1,
    mediumRisksCount: 1,
    lowRisksCount: 0,
    keyTerms: [
      {
        term: 'Liquidated Damages',
        definedInClause: 'Section 6',
        legalMeaning: 'A pre-set sum of money that must be paid as compensation upon breach.',
        plainEnglishExplanation: 'An automatic pre-determined fine of ₹50 Lakhs.',
        whyItMattersToYou: 'Enforces massive financial liability without proving real losses.',
      },
      {
        term: 'Perpetual Survival',
        definedInClause: 'Section 3',
        legalMeaning: 'Obligations that continue indefinitely without an expiration date.',
        plainEnglishExplanation: 'A secrecy duty that never ever ends.',
        whyItMattersToYou: 'Creates permanent compliance baggage for your team.',
      },
    ],
    obligationsSummary: {
      userCount: 3,
      counterpartyCount: 3,
      topObligations: [],
    },
    checklist: [
      {
        id: 'chk_nda_1',
        category: 'before_signing',
        action: 'Delete Section 6 (Rs. 50 Lakh liquidated damages penalty).',
        sourceSection: 'Section 6',
        priority: 'must_do',
        completed: false,
      },
      {
        id: 'chk_nda_2',
        category: 'before_signing',
        action: 'Cap confidentiality duration to 3 years from disclosure date.',
        sourceSection: 'Section 3',
        priority: 'must_do',
        completed: false,
      },
    ],
    lawyerPrepGuide: [
      {
        id: 'lp_nda_1',
        topic: 'Liquidated Damages in NDAs',
        specificClauseReference: 'Section 6',
        suggestedQuestion: 'How does Section 74 of the Indian Contract Act protect our firm if the counterparty attempts to enforce this ₹50 Lakh liquidated penalty?',
        contextWhyAsk: 'To confirm that arbitrary penalties cannot be enforced without actual proof of damage.',
        documentsToBring: ['Draft NDA Section 6'],
        targetOutcome: 'Replacement with standard indemnification for proven direct losses.',
      },
    ],
  },
};

export const SAMPLE_FREELANCE_AGREEMENT: LegalDocument = {
  id: 'sample-freelance-msa-04',
  name: 'Full_Stack_Freelance_Dev_Contract.pdf',
  uploadedAt: new Date().toISOString(),
  metadata: {
    fileName: 'Full_Stack_Freelance_Dev_Contract.pdf',
    fileSize: 37800,
    fileType: 'pdf',
    pageCount: 4,
    wordCount: 1380,
    characterCount: 8800,
    detectedType: 'freelance_service_agreement',
    jurisdictionHint: 'Republic of India (Commercial Courts Act / Indian Contract Act)',
    parsedAt: new Date().toISOString(),
  },
  rawText: `INDEPENDENT CONTRACTOR SOFTWARE SERVICES AGREEMENT

This Services Agreement is made between:
HyperScale SaaS Technologies Inc. ("Client");
AND
Rohan Deshmukh ("Contractor / Developer").

1. SCOPE AND DELIVERABLES
Contractor shall develop and deliver a high-performance analytics microservice as specified in Statement of Work #1.

2. PAYMENT TERMS AND 90-DAY MILESTONE HOLDBACK
Client shall pay Contractor a fixed fee of Rs. 4,50,000/- across three milestones. Payment shall be made Net 90 days following final written acceptance by Client. Client reserves the right to retain 25% of the total project fee for a 6-month warranty period to cover post-deployment debugging.

3. PRE-PAYMENT INTELLECTUAL PROPERTY ASSIGNMENT
Contractor agrees that all source code, architecture, algorithms, and documentation created by Contractor shall be deemed "work made for hire" and all worldwide copyright, patent, and IP rights shall transfer and vest in Client immediately upon creation, irrespective of whether Client has paid the corresponding invoice.

4. UNLIMITED CONTRACTOR INDEMNITY
Contractor shall defend, indemnify, and hold harmless Client, its officers, partners, and customers from any third-party claims, legal fees, or damages arising out of open-source license violations, bugs, service downtime, or alleged copyright infringement.

5. ASYMMETRIC LIMITATION OF LIABILITY
Client's aggregate liability under this Agreement for any cause shall be strictly limited to the amount paid to Contractor in the 30 days preceding the claim. Contractor's liability to Client shall be completely uncapped and unlimited.

6. TERMINATION FOR CONVENIENCE
Client may terminate this Agreement at any time with 3 days notice without cause. Upon such termination, Contractor shall immediately deliver all code, and Client shall have no obligation to pay for incomplete or in-progress milestones.`,
  clauses: [
    {
      id: 'fl_c2',
      clauseNumber: '2',
      title: 'Payment Terms & 90-Day Milestone Holdback',
      sectionPath: 'Section 2 > Payment Terms',
      rawText: 'Client shall pay Contractor a fixed fee of Rs. 4,50,000/- across three milestones. Payment shall be made Net 90 days following final written acceptance by Client. Client reserves the right to retain 25% of the total project fee for a 6-month warranty period to cover post-deployment debugging.',
      plainLanguageSummary: 'You have to wait 3 full months after finishing work to get paid, and the client withholds 25% for 6 months.',
      simplifiedReadabilityScore: 7.6,
      riskLevel: 'high',
      riskCategory: 'financial',
      isStandardClause: false,
      obligations: [],
      rights: [],
    },
    {
      id: 'fl_c3',
      clauseNumber: '3',
      title: 'Pre-Payment IP Assignment',
      sectionPath: 'Section 3 > Intellectual Property',
      rawText: 'Contractor agrees that all source code, architecture, algorithms, and documentation created by Contractor shall be deemed "work made for hire" and all worldwide copyright, patent, and IP rights shall transfer and vest in Client immediately upon creation, irrespective of whether Client has paid the corresponding invoice.',
      plainLanguageSummary: 'The client owns your code the second you write it, even if they refuse to pay your invoice.',
      simplifiedReadabilityScore: 8.1,
      riskLevel: 'critical',
      riskCategory: 'ip_rights',
      isStandardClause: false,
      obligations: [],
      rights: [],
    },
    {
      id: 'fl_c4',
      clauseNumber: '4',
      title: 'Unlimited Contractor Indemnity',
      sectionPath: 'Section 4 > Indemnity',
      rawText: 'Contractor shall defend, indemnify, and hold harmless Client, its officers, partners, and customers from any third-party claims, legal fees, or damages arising out of open-source license violations, bugs, service downtime, or alleged copyright infringement.',
      plainLanguageSummary: 'You are personally on the hook to pay for client lawsuits and server downtime caused by software bugs.',
      simplifiedReadabilityScore: 8.4,
      riskLevel: 'critical',
      riskCategory: 'liability',
      isStandardClause: false,
      obligations: [],
      rights: [],
    },
    {
      id: 'fl_c5',
      clauseNumber: '5',
      title: 'Asymmetric Limitation of Liability',
      sectionPath: 'Section 5 > Limitation of Liability',
      rawText: "Client's aggregate liability under this Agreement for any cause shall be strictly limited to the amount paid to Contractor in the 30 days preceding the claim. Contractor's liability to Client shall be completely uncapped and unlimited.",
      plainLanguageSummary: 'If the client breaches, they pay virtually nothing; but if you make a mistake, your liability is infinite.',
      simplifiedReadabilityScore: 7.9,
      riskLevel: 'critical',
      riskCategory: 'liability',
      isStandardClause: false,
      obligations: [],
      rights: [],
    },
  ],
  risks: [
    {
      id: 'r_fl_1',
      clauseId: 'fl_c3',
      clauseTitle: 'Pre-Payment IP Assignment',
      sectionPath: 'Section 3',
      severity: 'critical',
      category: 'ip_rights',
      sourceQuote: 'all worldwide copyright, patent, and IP rights shall transfer and vest in Client immediately upon creation, irrespective of whether Client has paid the corresponding invoice',
      title: 'Pre-Payment IP Transfer: Client Owns Code Without Paying',
      explanation: 'Standard contractor agreements strictly state that IP transfers only upon receipt of full payment in cleared funds.',
      practicalImpact: 'If client defaults or ghosts you, you have no legal leverage to withhold the codebase.',
      recommendedAction: 'Make IP transfer strictly contingent upon full receipt of payment.',
      suggestedNegotiationRedline: 'All rights, title, and interest in deliverables shall transfer and vest in Client strictly upon full and final receipt of payment by Contractor.',
    },
    {
      id: 'r_fl_2',
      clauseId: 'fl_c5',
      clauseTitle: 'Asymmetric Limitation of Liability',
      sectionPath: 'Section 5',
      severity: 'critical',
      category: 'liability',
      sourceQuote: "Contractor's liability to Client shall be completely uncapped and unlimited",
      title: 'Uncapped Liability for a ₹4.5 Lakh Project',
      explanation: 'Exposes an individual freelance developer to unlimited commercial damages.',
      practicalImpact: 'A single bug could trigger commercial lawsuits exceeding total project fees.',
      recommendedAction: 'Cap contractor liability to 100% of fees actually received under this SOW.',
    },
  ],
  summary: {
    executiveSummary: 'This freelance development contract contains predatory terms including IP assignment occurring prior to payment, uncapped personal liability for bugs, Net-90 payment terms with a 25% 6-month holdback, and termination on 3 days notice without WIP compensation. You should negotiate payment-contingent IP transfer and mutual liability caps.',
    overallRiskScore: 89,
    overallRiskSeverity: 'critical',
    totalClauses: 6,
    criticalRisksCount: 3,
    highRisksCount: 1,
    mediumRisksCount: 0,
    lowRisksCount: 0,
    keyTerms: [
      {
        term: 'Work Made for Hire',
        definedInClause: 'Section 3',
        legalMeaning: 'A doctrine where the contracting party is deemed the original legal author of the work.',
        plainEnglishExplanation: 'You do not own your code from the moment you write it.',
        whyItMattersToYou: 'Destroys developer leverage if the client delays or withholds payment.',
      },
      {
        term: 'Limitation of Liability',
        definedInClause: 'Section 5',
        legalMeaning: 'A contractual cap on the maximum damages one party can recover.',
        plainEnglishExplanation: 'A shield protecting the client while leaving you exposed.',
        whyItMattersToYou: 'Protects the client up to 30 days of fees but leaves you with infinite liability.',
      },
    ],
    obligationsSummary: {
      userCount: 4,
      counterpartyCount: 2,
      topObligations: [],
    },
    checklist: [
      {
        id: 'chk_fl_1',
        category: 'before_signing',
        action: 'Amend Section 3: IP transfers only upon receipt of full payment.',
        sourceSection: 'Section 3',
        priority: 'must_do',
        completed: false,
      },
      {
        id: 'chk_fl_2',
        category: 'before_signing',
        action: 'Shorten payment window from Net 90 to Net 15 days.',
        sourceSection: 'Section 2',
        priority: 'must_do',
        completed: false,
      },
    ],
    lawyerPrepGuide: [
      {
        id: 'lp_fl_1',
        topic: 'Conditioning IP Assignment on Payment',
        specificClauseReference: 'Section 3',
        suggestedQuestion: 'How can we rephrase Section 3 to ensure title remains with the freelancer until the bank confirms credit of the final milestone?',
        contextWhyAsk: 'To prevent client from legally deploying our software while withholding our fees.',
        documentsToBring: ['Freelance Agreement SOW #1'],
        targetOutcome: 'Standard payment-contingent intellectual property covenant.',
      },
    ],
  },
};

export const SAMPLE_INSURANCE_POLICY: LegalDocument = {
  id: 'sample-insurance-policy-05',
  name: 'CareShield_Family_Health_Policy_Terms.pdf',
  uploadedAt: new Date().toISOString(),
  metadata: {
    fileName: 'CareShield_Family_Health_Policy_Terms.pdf',
    fileSize: 44200,
    fileType: 'pdf',
    pageCount: 5,
    wordCount: 1820,
    characterCount: 11400,
    detectedType: 'insurance_policy',
    jurisdictionHint: 'Republic of India (IRDAI Health Insurance Regulations)',
    parsedAt: new Date().toISOString(),
  },
  rawText: `CARESHIELD COMPREHENSIVE HEALTH INSURANCE POLICY

Policy Schedule & Terms Issued By:
National Care Health Insurance Co. Ltd.
Policyholder: Rajesh Verma (Sum Insured: Rs. 10,00,000/-).

1. PRE-EXISTING DISEASE (PED) WAITING PERIOD
Any condition, ailment, or injury diagnosed within 48 months prior to the first policy inception shall not be covered until 36 continuous months of coverage have elapsed. Any failure to disclose even asymptomatic conditions shall render the policy void ab initio with forfeiture of all premiums paid.

2. ROOM RENT SUB-LIMIT AND PROPORTIONATE DEDUCTIONS
Normal Room Rent is capped at 1% of Sum Insured (Rs. 10,000/day) and ICU at 2% (Rs. 20,000/day). If the Insured occupies a room category higher than the eligible limit, all associated medical expenses including surgeon fees, OT charges, and consultation fees shall be subject to proportionate deduction penalty.

3. MANDATORY 48-HOUR CLAIM NOTIFICATION
For planned hospitalization, written intimation must be submitted at least 48 hours prior to admission. For emergency hospitalization, intimation must be given within 24 hours of admission. Failure to provide timely notice shall result in absolute forfeiture and rejection of the entire claim.

4. MANDATORY 20% CO-PAYMENT
A mandatory co-payment of 20% shall apply to all admissible claim amounts across all age groups and network hospitals, meaning the Insured must pay 20% of every approved medical bill out-of-pocket.

5. EXCLUSIONS AND NON-PAYABLE CONSUMABLES
All medical consumables, gloves, syringes, PPE kits, administrative charges, and robotic surgeries are strictly excluded from reimbursement.

6. OMBUDSMAN & DISPUTE RESOLUTION
Any grievance must first be filed with the Company Grievance Cell within 30 days. No dispute may be raised before the Insurance Ombudsman after the expiry of 12 months from the date of claim repudiation.`,
  clauses: [
    {
      id: 'ins_c2',
      clauseNumber: '2',
      title: 'Room Rent Sub-Limit & Proportionate Deductions',
      sectionPath: 'Section 2 > Room Rent Sub-Limit',
      rawText: 'Normal Room Rent is capped at 1% of Sum Insured (Rs. 10,000/day) and ICU at 2% (Rs. 20,000/day). If the Insured occupies a room category higher than the eligible limit, all associated medical expenses including surgeon fees, OT charges, and consultation fees shall be subject to proportionate deduction penalty.',
      plainLanguageSummary: 'If you take a private room costing just ₹1,000 above your limit, the insurer will slash your entire hospital bill (doctors, surgery, medicines) proportionately, costing you lakhs.',
      simplifiedReadabilityScore: 7.9,
      riskLevel: 'critical',
      riskCategory: 'financial',
      isStandardClause: false,
      obligations: [],
      rights: [],
    },
    {
      id: 'ins_c3',
      clauseNumber: '3',
      title: 'Mandatory 48-Hour Claim Notification',
      sectionPath: 'Section 3 > Claim Notification',
      rawText: 'For planned hospitalization, written intimation must be submitted at least 48 hours prior to admission. For emergency hospitalization, intimation must be given within 24 hours of admission. Failure to provide timely notice shall result in absolute forfeiture and rejection of the entire claim.',
      plainLanguageSummary: 'If an emergency strikes and your family informs the insurer 25 hours after admission instead of 24, they can completely reject your entire medical claim.',
      simplifiedReadabilityScore: 7.5,
      riskLevel: 'critical',
      riskCategory: 'compliance',
      isStandardClause: false,
      obligations: [],
      rights: [],
    },
    {
      id: 'ins_c4',
      clauseNumber: '4',
      title: 'Mandatory 20% Co-Payment',
      sectionPath: 'Section 4 > Co-Payment',
      rawText: 'A mandatory co-payment of 20% shall apply to all admissible claim amounts across all age groups and network hospitals, meaning the Insured must pay 20% of every approved medical bill out-of-pocket.',
      plainLanguageSummary: 'You are forced to pay 20% of every hospital bill out of your own pocket, even in network hospitals.',
      simplifiedReadabilityScore: 7.1,
      riskLevel: 'high',
      riskCategory: 'financial',
      isStandardClause: false,
      obligations: [],
      rights: [],
    },
  ],
  risks: [
    {
      id: 'r_ins_1',
      clauseId: 'ins_c2',
      clauseTitle: 'Room Rent Sub-Limit & Proportionate Deductions',
      sectionPath: 'Section 2',
      severity: 'critical',
      category: 'financial',
      sourceQuote: 'all associated medical expenses including surgeon fees, OT charges, and consultation fees shall be subject to proportionate deduction penalty',
      title: 'Proportionate Deduction Trap on Hospitalization',
      explanation: 'Room rent sub-limits do not just limit room tariff; they penalize the entire claim proportionally if you exceed the room category.',
      practicalImpact: 'On a ₹5,00,000 surgery, exceeding room rent by 20% can result in ₹1,50,000+ out-of-pocket deductions.',
      recommendedAction: 'Opt for a policy with No Room Rent Capping, or never select a room above ₹10,000/day.',
      legalBasisOrJurisdictionNotice: 'IRDAI Master Circular on Standardization of Health Insurance Contracts.',
    },
    {
      id: 'r_ins_2',
      clauseId: 'ins_c3',
      clauseTitle: 'Mandatory 48-Hour Claim Notification',
      sectionPath: 'Section 3',
      severity: 'critical',
      category: 'compliance',
      sourceQuote: 'Failure to provide timely notice shall result in absolute forfeiture and rejection of the entire claim',
      title: 'Automatic Claim Repudiation for Notice Delay',
      explanation: 'IRDAI regulations prohibit insurers from rejecting genuine claims solely on grounds of delayed notification when genuine distress exists.',
      practicalImpact: 'Risk of having legitimate emergency hospital expenses rejected outright.',
      recommendedAction: 'Negotiate removal of forfeiture condition; cite IRDAI circular on genuine delay condonation.',
      legalBasisOrJurisdictionNotice: 'IRDAI Circular Ref: IRDA/HLTH/MISC/CIR/216/09/2011 (Claims cannot be rejected solely on technical delays).',
    },
  ],
  summary: {
    executiveSummary: 'This health insurance policy includes significant consumer financial traps: a proportionate deduction penalty on room rent capping, an arbitrary 24/48-hour claim notification forfeiture rule (prohibited by IRDAI guidance), and a 20% mandatory out-of-pocket co-payment. Consumers should be alert to these deductions before hospital admission.',
    overallRiskScore: 81,
    overallRiskSeverity: 'critical',
    totalClauses: 6,
    criticalRisksCount: 2,
    highRisksCount: 1,
    mediumRisksCount: 0,
    lowRisksCount: 0,
    keyTerms: [
      {
        term: 'Proportionate Deduction',
        definedInClause: 'Section 2',
        legalMeaning: 'A penalty reduction applied to doctor, surgery, and OT costs proportional to the room tariff excess.',
        plainEnglishExplanation: 'A formula that cuts your entire hospital payout if you pick a slightly nicer room.',
        whyItMattersToYou: 'Can turn a ₹5 Lakh coverage into a ₹2.5 Lakh out-of-pocket surprise.',
      },
      {
        term: 'Co-Payment',
        definedInClause: 'Section 4',
        legalMeaning: 'A cost-sharing requirement where the insured pays a fixed percentage of admissible costs.',
        plainEnglishExplanation: 'You pay 20% of every medical bill yourself.',
        whyItMattersToYou: 'Guarantees you never receive 100% reimbursement.',
      },
    ],
    obligationsSummary: {
      userCount: 4,
      counterpartyCount: 2,
      topObligations: [],
    },
    checklist: [
      {
        id: 'chk_ins_1',
        category: 'before_signing',
        action: 'Inquire whether a waiver rider exists to eliminate the 1% room rent sub-limit.',
        sourceSection: 'Section 2',
        priority: 'must_do',
        completed: false,
      },
      {
        id: 'chk_ins_2',
        category: 'during_term',
        action: 'Save TPA emergency WhatsApp number in family phones to ensure intimation within 24 hours.',
        sourceSection: 'Section 3',
        priority: 'must_do',
        completed: false,
      },
    ],
    lawyerPrepGuide: [
      {
        id: 'lp_ins_1',
        topic: 'IRDAI Protection on Technical Notice Delays',
        specificClauseReference: 'Section 3',
        suggestedQuestion: 'If an emergency prevents notification within 24 hours, how does the IRDAI 2011 Circular protect us from claim repudiation?',
        contextWhyAsk: 'To challenge insurer attempts to repudiate emergency hospitalization.',
        documentsToBring: ['Policy Schedule', 'Hospital Admission Record'],
        targetOutcome: 'Formal legal demand letter citing IRDAI guidelines for claim revival.',
      },
    ],
  },
};

export const SAMPLE_LOAN_AGREEMENT: LegalDocument = {
  id: 'sample-loan-agreement-06',
  name: 'SME_Working_Capital_Loan_Sanction.pdf',
  uploadedAt: new Date().toISOString(),
  metadata: {
    fileName: 'SME_Working_Capital_Loan_Sanction.pdf',
    fileSize: 42100,
    fileType: 'pdf',
    pageCount: 5,
    wordCount: 1650,
    characterCount: 10200,
    detectedType: 'loan_agreement',
    jurisdictionHint: 'Republic of India (Reserve Bank of India Fair Practices Code)',
    parsedAt: new Date().toISOString(),
  },
  rawText: `SECURED SME WORKING CAPITAL CREDIT FACILITY AGREEMENT

Lender: Pinnacle Capital & Finance NBFC Ltd.
Borrower: Quantum Precision Engineering Pvt. Ltd. & Promoters (Guarantors).
Facility Amount: Rs. 25,00,000/- (Rupees Twenty-Five Lakhs).

1. DISBURSAL AND FLOATING INTEREST
Interest shall be charged at a benchmark floating rate of 14.5% per annum, reset monthly at the sole discretion of the Lender without prior borrower consent.

2. PENAL COMPOUND INTEREST ON TECHNICAL DEFAULT
Any delay in payment of interest or installment, or failure to submit quarterly financial statements within 15 days of quarter-end, shall constitute a Default Event attracting penal interest of 24% per annum compounded monthly on the entire outstanding balance.

3. ACCELERATION AND IMMEDIATE RECALL
Upon the occurrence of any event which in the sole opinion of the Lender may adversely affect the financial viability of the Borrower, the Lender may declare the entire outstanding principal immediately due and payable within 48 hours.

4. UNCONDITIONAL PERSONAL GUARANTEE & NEGATIVE LIEN
The Promoters and Directors hereby irrevocably and personally guarantee repayment. A negative lien is created over all personal bank accounts, residential properties, and ancestral assets of the Promoters, present and future.

5. PREPAYMENT FORECLOSURE CHARGE
If Borrower repays the facility prior to maturity from any source including internal business profits, Borrower shall pay a foreclosure penalty of 5% on the original sanctioned limit plus applicable GST.

6. POWER OF ATTORNEY AND DIRECT RECOVERY
Borrower irrevocably appoints Lender as its attorney to execute debits on any bank account maintained by Borrower or Guarantor, without requiring prior judicial process or arbitration.`,
  clauses: [
    {
      id: 'loan_c2',
      clauseNumber: '2',
      title: 'Penal Compound Interest on Technical Default',
      sectionPath: 'Section 2 > Penal Interest',
      rawText: 'Any delay in payment of interest or installment, or failure to submit quarterly financial statements within 15 days of quarter-end, shall constitute a Default Event attracting penal interest of 24% per annum compounded monthly on the entire outstanding balance.',
      plainLanguageSummary: 'If you are late on quarterly reporting paperwork, your loan interest shoots up to an astronomical 24% compounded monthly on the entire ₹25 Lakh balance.',
      simplifiedReadabilityScore: 8.3,
      riskLevel: 'critical',
      riskCategory: 'financial',
      isStandardClause: false,
      obligations: [],
      rights: [],
    },
    {
      id: 'loan_c3',
      clauseNumber: '3',
      title: 'Subjective Acceleration & 48-Hour Recall',
      sectionPath: 'Section 3 > Acceleration and Recall',
      rawText: 'Upon the occurrence of any event which in the sole opinion of the Lender may adversely affect the financial viability of the Borrower, the Lender may declare the entire outstanding principal immediately due and payable within 48 hours.',
      plainLanguageSummary: 'If the lender subjectively feels nervous about your industry, they can demand you pay back all ₹25 Lakhs within 48 hours.',
      simplifiedReadabilityScore: 8.6,
      riskLevel: 'critical',
      riskCategory: 'termination',
      isStandardClause: false,
      obligations: [],
      rights: [],
    },
    {
      id: 'loan_c4',
      clauseNumber: '4',
      title: 'Unconditional Personal Guarantee & Ancestral Asset Lien',
      sectionPath: 'Section 4 > Guarantee & Negative Lien',
      rawText: 'The Promoters and Directors hereby irrevocably and personally guarantee repayment. A negative lien is created over all personal bank accounts, residential properties, and ancestral assets of the Promoters, present and future.',
      plainLanguageSummary: 'You are personally putting your family home, personal savings, and ancestral property on the line for the business loan.',
      simplifiedReadabilityScore: 8.0,
      riskLevel: 'high',
      riskCategory: 'liability',
      isStandardClause: false,
      obligations: [],
      rights: [],
    },
    {
      id: 'loan_c5',
      clauseNumber: '5',
      title: 'Prepayment Foreclosure Charge',
      sectionPath: 'Section 5 > Prepayment Penalty',
      rawText: 'If Borrower repays the facility prior to maturity from any source including internal business profits, Borrower shall pay a foreclosure penalty of 5% on the original sanctioned limit plus applicable GST.',
      plainLanguageSummary: 'If your business succeeds and you want to pay off the loan early, you are hit with a ₹1.25 Lakh penalty fee.',
      simplifiedReadabilityScore: 7.7,
      riskLevel: 'high',
      riskCategory: 'penalty',
      isStandardClause: false,
      obligations: [],
      rights: [],
    },
  ],
  risks: [
    {
      id: 'r_loan_1',
      clauseId: 'loan_c3',
      clauseTitle: 'Subjective Acceleration & 48-Hour Recall',
      sectionPath: 'Section 3',
      severity: 'critical',
      category: 'termination',
      sourceQuote: 'declare the entire outstanding principal immediately due and payable within 48 hours',
      title: '48-Hour Subjective Loan Acceleration',
      explanation: 'Allows lender to call back the entire loan based on subjective belief without objective payment default.',
      practicalImpact: 'Can push a solvent SME into sudden insolvency within 2 days.',
      recommendedAction: 'Restrict acceleration strictly to monetary payment defaults after a 30-day cure period.',
    },
    {
      id: 'r_loan_2',
      clauseId: 'loan_c2',
      clauseTitle: 'Penal Compound Interest on Technical Default',
      sectionPath: 'Section 2',
      severity: 'critical',
      category: 'financial',
      sourceQuote: 'penal interest of 24% per annum compounded monthly on the entire outstanding balance',
      title: 'Excessive 24% Compound Penal Interest',
      explanation: 'Compounding penal interest violates RBI guidelines on Fair Lending Practices.',
      practicalImpact: 'Debt spirals exponentially upon minor administrative filing delays.',
      recommendedAction: 'Replace compound penal interest with simple interest penal charges strictly on the overdue amount, not on the total loan.',
      legalBasisOrJurisdictionNotice: 'RBI Master Direction on Fair Practices Code / Penal Charges in Loan Accounts (2023).',
    },
  ],
  summary: {
    executiveSummary: 'This SME working capital facility features oppressive borrowing terms: subjective 48-hour loan acceleration, compounding 24% penal interest on technical paperwork delays (contrary to RBI fair lending directions), a blanket lien on ancestral assets, and a 5% prepayment penalty. Borrowers should mandate a 30-day cure period for defaults.',
    overallRiskScore: 92,
    overallRiskSeverity: 'critical',
    totalClauses: 6,
    criticalRisksCount: 2,
    highRisksCount: 2,
    mediumRisksCount: 0,
    lowRisksCount: 0,
    keyTerms: [
      {
        term: 'Acceleration Clause',
        definedInClause: 'Section 3',
        legalMeaning: 'A provision allowing the lender to demand immediate repayment of the entire loan balance.',
        plainEnglishExplanation: 'The bank forces you to pay all ₹25 Lakhs back right now.',
        whyItMattersToYou: 'Can instantly bankrupt a business if triggered unexpectedly.',
      },
      {
        term: 'Penal Interest',
        definedInClause: 'Section 2',
        legalMeaning: 'An elevated punitive interest rate charged during periods of contractual default.',
        plainEnglishExplanation: 'A punitive 24% interest penalty on top of normal loan interest.',
        whyItMattersToYou: 'Quickly balloons debt out of control.',
      },
    ],
    obligationsSummary: {
      userCount: 5,
      counterpartyCount: 1,
      topObligations: [],
    },
    checklist: [
      {
        id: 'chk_loan_1',
        category: 'before_signing',
        action: 'Mandate 30 days written notice before acceleration can be declared.',
        sourceSection: 'Section 3',
        priority: 'must_do',
        completed: false,
      },
      {
        id: 'chk_loan_2',
        category: 'before_signing',
        action: 'Require penal charges to be simple interest charged strictly on overdue sums per RBI norms.',
        sourceSection: 'Section 2',
        priority: 'must_do',
        completed: false,
      },
    ],
    lawyerPrepGuide: [
      {
        id: 'lp_loan_1',
        topic: 'RBI Guidelines on Penal Charges in Loan Accounts',
        specificClauseReference: 'Section 2',
        suggestedQuestion: 'How does the RBI August 2023 circular on Fair Lending Practices protect us against Section 2 compounding penal interest?',
        contextWhyAsk: 'To mandate that the NBFC removes compounding on penal interest.',
        documentsToBring: ['Sanction Letter', 'Facility Agreement Section 2'],
        targetOutcome: 'Restructuring penal charges as separate simple fees.',
      },
    ],
  },
};

export const ALL_SAMPLE_DOCUMENTS: LegalDocument[] = [
  SAMPLE_RENTAL_AGREEMENT,
  SAMPLE_EMPLOYMENT_CONTRACT,
  SAMPLE_NDA,
  SAMPLE_FREELANCE_AGREEMENT,
  SAMPLE_INSURANCE_POLICY,
  SAMPLE_LOAN_AGREEMENT,
];

