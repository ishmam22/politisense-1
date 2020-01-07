/* eslint-env jest */
import { ExpendituresScraper } from '../ExpendituresScraper'
import { FinancialRecord } from '../../../models/FinancialRecord'
const chai = require('chai')
const Assert = chai.assert

describe('All Expenditures Tests', () => {
  let underTest
  const testExpenditure = '<MemberExpenditureReports xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="MER2020Q1-1019" startDate="2019-04-01" endDate="2019-06-30"><Report type="MP"><StartDate>2019-04-01</StartDate><EndDate xsi:nil="true" /><Constituency id="6cef7ff8-9c4f-42b4-b9ca-61665b75340a" name-en="Edmonton Manning" name-fr="Edmonton Manning" numberOfElectors="81361" size="158" sizeUnit="km²" province="Alberta" electionCanadaCode="48016" /><Member id="629b5454-cca8-4ee0-8931-6f549c4deb06" personId="3283699b-5c58-486f-a315-a3f5e175d175" lastName="Aboultaif" firstName="Ziad" status="Active" party-en="Conservative" party-fr="Conservateur" /><ExpenditureCategories><Category id="010EMP_SALARY" name-en="1-Employees\' salaries" name-fr="1-Salaires des employés"><MembersBudget value="49668.730" currency="CAD" /><ResourcesProvidedByTheHouse xsi:nil="true" /><Total value="49668.730" currency="CAD" /><SubCategories /></Category><Category id="020SERV_CONTRCT" name-en="2-Service Contracts" name-fr="2-Contrats de services"><MembersBudget value="0" currency="CAD" /><ResourcesProvidedByTheHouse xsi:nil="true" /><Total xsi:nil="true" /><SubCategories /></Category><Category id="030TRAVEL" name-en="3-Travel" name-fr="3-Déplacements"><MembersBudget value="0" currency="CAD" /><ResourcesProvidedByTheHouse xsi:nil="true" /><Total xsi:nil="true" /><SubCategories><Category id="03AMP" name-en="Member" name-fr="Député"><MembersBudget value="405.410" currency="CAD" /><ResourcesProvidedByTheHouse value="13030.410" currency="CAD" /><TravelPoints><Points type="Regular" value="6.00" /><Points type="Special" value="5.00" /></TravelPoints><Total value="13435.820" currency="CAD" /><SubCategories /></Category><Category id="03BDT" name-en="Designated traveller" name-fr="Voyageur désigné"><MembersBudget value="0" currency="CAD" /><ResourcesProvidedByTheHouse value="3859.330" currency="CAD" /><TravelPoints><Points type="Regular" value="2.50" /></TravelPoints><Total value="3859.330" currency="CAD" /><SubCategories /></Category><Category id="03CDEPENDANT" name-en="Dependants" name-fr="Personnes à charge"><MembersBudget value="0" currency="CAD" /><ResourcesProvidedByTheHouse value="0.000" currency="CAD" /><Total value="0.000" currency="CAD" /><SubCategories /></Category><Category id="03DEMPLOYEE" name-en="Employees" name-fr="Employés"><MembersBudget value="1936.060" currency="CAD" /><ResourcesProvidedByTheHouse value="4499.530" currency="CAD" /><TravelPoints><Points type="Special" value="3.00" /><Points type="Regular" value="1.00" /></TravelPoints><Total value="6435.590" currency="CAD" /><SubCategories /></Category><Category id="03EMP_ACCOMM" name-en="Member\'s accommodation expenses" name-fr="Frais d\'hébergement du député"><MembersBudget value="1429.340" currency="CAD" /><ResourcesProvidedByTheHouse xsi:nil="true" /><Total value="1429.340" currency="CAD" /><SubCategories /></Category><Category id="03FMP_PERDIEM" name-en="Member\'s per diem expenses" name-fr="Indemnités journalières du député"><MembersBudget value="2224.530" currency="CAD" /><ResourcesProvidedByTheHouse xsi:nil="true" /><Total value="2224.530" currency="CAD" /><SubCategories /></Category><Category id="03GMP_SEC_RES" name-en="Member\'s secondary residence expenses" name-fr="Frais liés à une résidence secondaire du député"><MembersBudget value="8223.180" currency="CAD" /><ResourcesProvidedByTheHouse xsi:nil="true" /><Total value="8223.180" currency="CAD" /><SubCategories /></Category></SubCategories></Category><Category id="040HOSPITALITY" name-en="4-Hospitality" name-fr="4-Accueil"><MembersBudget value="808.320" currency="CAD" /><ResourcesProvidedByTheHouse xsi:nil="true" /><Total value="808.320" currency="CAD" /><SubCategories /></Category><Category id="050GIFTS" name-en="5-Gifts" name-fr="5-Cadeaux"><MembersBudget value="0" currency="CAD" /><ResourcesProvidedByTheHouse xsi:nil="true" /><Total xsi:nil="true" /><SubCategories /></Category><Category id="060ADVERTISING" name-en="6-Advertising" name-fr="6-Publicité"><MembersBudget value="1455.650" currency="CAD" /><ResourcesProvidedByTheHouse xsi:nil="true" /><Total value="1455.650" currency="CAD" /><SubCategories /></Category><Category id="070PRINTING" name-en="7-Printing" name-fr="7-Impression"><MembersBudget value="0" currency="CAD" /><ResourcesProvidedByTheHouse xsi:nil="true" /><Total xsi:nil="true" /><SubCategories><Category id="07AHOUSEHOLDERS" name-en="Householders" name-fr="Envois collectifs"><MembersBudget value="0" currency="CAD" /><ResourcesProvidedByTheHouse xsi:nil="true" /><Total xsi:nil="true" /><SubCategories /></Category><Category id="07BTEN_PERCNTER" name-en="Ten percenters" name-fr="Dix-pour-cent"><MembersBudget value="0" currency="CAD" /><ResourcesProvidedByTheHouse value="1172.330" currency="CAD" /><Total value="1172.330" currency="CAD" /><SubCategories /></Category><Category id="07COTHER_PRINT" name-en="Other printing related expenses" name-fr="Autres frais liés à l\'impression"><MembersBudget value="0" currency="CAD" /><ResourcesProvidedByTheHouse xsi:nil="true" /><Total xsi:nil="true" /><SubCategories /></Category></SubCategories></Category><Category id="080OFFICES" name-en="8-Offices" name-fr="8-Bureaux"><MembersBudget value="0" currency="CAD" /><ResourcesProvidedByTheHouse xsi:nil="true" /><Total xsi:nil="true" /><SubCategories><Category id="08ACONSTIT_LEAS" name-en="Constituency office leases, insurance and utilities" name-fr="Baux, assurances et services publics pour les bureaux de circonscription"><MembersBudget value="8479.240" currency="CAD" /><ResourcesProvidedByTheHouse xsi:nil="true" /><Total value="8479.240" currency="CAD" /><SubCategories /></Category><Category id="08BFURN_EQUIPPR" name-en="Furniture, furnishing and equipment purchases" name-fr="Achats de mobilier, d\'ameublement et d\'équipement"><MembersBudget value="11.990" currency="CAD" /><ResourcesProvidedByTheHouse xsi:nil="true" /><Total value="11.990" currency="CAD" /><SubCategories /></Category><Category id="08CEQUIP_RENT" name-en="Equipment rentals" name-fr="Location d\'équipement"><MembersBudget value="0" currency="CAD" /><ResourcesProvidedByTheHouse xsi:nil="true" /><Total xsi:nil="true" /><SubCategories /></Category><Category id="08DTELCOM_PURCH" name-en="Informatics and telecommunication equipment purchases" name-fr="Achats d\'équipement informatique et de télécommunications"><MembersBudget value="0" currency="CAD" /><ResourcesProvidedByTheHouse xsi:nil="true" /><Total xsi:nil="true" /><SubCategories /></Category><Category id="08ETELECOM_SERV" name-en="Telecommunication services" name-fr="Services de télécommunications"><MembersBudget value="300.650" currency="CAD" /><ResourcesProvidedByTheHouse xsi:nil="true" /><Total value="300.650" currency="CAD" /><SubCategories /></Category><Category id="08FREPR_MAINT" name-en="Repairs and maintenance" name-fr="Réparations et entretien"><MembersBudget value="0" currency="CAD" /><ResourcesProvidedByTheHouse xsi:nil="true" /><Total xsi:nil="true" /><SubCategories /></Category><Category id="08GPOSTAGE" name-en="Postage and courier services" name-fr="Services postaux et de messagerie"><MembersBudget value="591.950" currency="CAD" /><ResourcesProvidedByTheHouse xsi:nil="true" /><Total value="591.950" currency="CAD" /><SubCategories /></Category><Category id="08HMAT_SUPPLY" name-en="Materials and supplies" name-fr="Matériel et fournitures"><MembersBudget value="243.540" currency="CAD" /><ResourcesProvidedByTheHouse value="601.440" currency="CAD" /><Total value="844.980" currency="CAD" /><SubCategories /></Category><Category id="08ITRAINING" name-en="Training" name-fr="Formation"><MembersBudget value="0" currency="CAD" /><ResourcesProvidedByTheHouse xsi:nil="true" /><Total xsi:nil="true" /><SubCategories /></Category></SubCategories></Category></ExpenditureCategories><ExpenditureTotals><MembersBudget value="75778.590" currency="CAD" /><ResourcesProvidedByTheHouse value="23163.040" currency="CAD" /><TravelPoints><Points type="Special" value="8.00" /><Points type="Regular" value="9.50" /></TravelPoints><Total value="98941.630" currency="CAD" /></ExpenditureTotals><Footnote /></Report></MemberExpenditureReports>'
  let fr
  beforeAll(() => {
    fr = new FinancialRecord('', '', '', 0, 0, 0)
  })

  beforeEach(() => {
    underTest = new ExpendituresScraper('www.testurl.com')
    underTest.reader.perform = async () => {
      return testExpenditure
    }
  })

  test('Produces Financial Report', async () => {
    const expenditures = await underTest.createExpenditureRecords()
    Assert.equal(typeof expenditures, typeof [])
    Assert.equal(expenditures.length, 27)
    const id = expenditures[0].member
    expenditures.forEach(expenditure => {
      Assert.equal(typeof expenditure, typeof fr)
      Assert.equal(id, expenditure.member)
    })
  }, 60000)
})
