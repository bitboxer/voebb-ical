import fs from "fs";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import fetchLoanPage from "../src/app/fetch_loan_page.js";
import FetchMock from "./fetch_mock.js";

const { expect } = chai;
chai.use(chaiAsPromised);

describe("FetchLoanPage", () => {
  it("should load the loan page of an user", async () => {
    const mock = new FetchMock();

    mock.addPage(
      fs
        .readFileSync("./test/data/fetch_loan_page/1_landing_page.html")
        .toString()
    );
    mock.addPage(
      fs
        .readFileSync("./test/data/fetch_loan_page/2_login_page.html")
        .toString()
    );
    mock.addPage(
      fs
        .readFileSync("./test/data/fetch_loan_page/4_mein_konto.html")
        .toString()
    );
    mock.addPage(
      fs.readFileSync("./test/data/fetch_loan_page/5_loans.html").toString()
    );

    const result = await fetchLoanPage("veobid", "password", (url, params) =>
      mock.fetch(url, params)
    );

    expect(result).to.contain("Habibi");
  }).timeout(60000);

  it("should throw an error if the username/password is wrong", () => {
    const mock = new FetchMock();

    mock.addPage(
      fs
        .readFileSync("./test/data/fetch_loan_page/1_landing_page.html")
        .toString()
    );
    mock.addPage(
      fs
        .readFileSync("./test/data/fetch_loan_page/2_login_page.html")
        .toString()
    );

    mock.addPage(
      fs
        .readFileSync("./test/data/fetch_loan_page/3_wrong_password.html")
        .toString()
    );

    expect(
      fetchLoanPage("veobid", "password", (url, params) =>
        mock.fetch(url, params)
      )
    ).to.be.rejectedWith("Login failed. Please check username and password.");
  }).timeout(60000);
});
