import { all, call } from 'redux-saga/effects';

import { loginSaga } from './login/login.sagas';

// Dashboard
// import { dashboardSaga } from './dashboard/dashboard.saga';

// // Add/Create member
// import { mobileNumberSaga } from './member-add/mobile-number/mobile-number.saga';
// import { memberDetailsSaga } from './member-add/add-member/add-member.saga';
// import { nomineeDetailsSaga } from './member-add/basic-nominee-details/basic-nominee-details.saga';
// import { personalDetailsSaga } from './member-add/personal-details/personal-details.saga';
// import { bankDetailsSaga } from './member-add/bank-details/bank-details.saga';
// import { basicDetailsSaga } from './member-add/basic-details/basic-details.saga';
// import { creditCheckDetailsSaga } from './member-add/credit-check/credit-check.saga';
// import { currentAddressSaga } from './member-add/current-address/current-address.saga';
// import { familyDetailSaga } from './member-add/family-details/family-details.saga';
// import { houseDetailsSaga } from './member-add/house-details/house-details.saga';
// import { housePhotosSaga } from './member-add/house-photos/house-photos.saga';
// import { nocPhotosSaga } from './member-add/noc-photos/noc-photos.saga';
// import { addMemberPhotoSaga } from './member-add/photo-verification/photo-verification.saga';
// import { residentialDetailsSaga } from './member-add/residential-details/residential-details.saga';
// import { signatureSaga } from './member-add/signature/signature.saga';
// import { verifyOtpSaga } from './member-add/verify-otp/verify-otp.saga';
// import { postCodeSaga } from './postCode/postCode.sagas';
// import { coApplicantSaga } from './co-applicant/co-applicant.saga';
// import { officialDetailsSaga } from './official-details/official-details.saga';
// import { extraInformationSaga } from './extra-infromation/extra-information.saga';
// import { addressExtraProofSaga } from './address-extra-proof/address-extra-proof.saga';
// import { passbookChequeDetailsSaga } from './passbook-cheque-details/passbook-cheque-details.saga';
// import { otherDocumentSaga } from './member-add/other-Document/other-document.saga';
// import { MemberBusinessSaga } from './member-add/Member-Business/member-business.saga';

// // Common Upload
// import { aadharDetailsSaga } from './aadhar-details/aadhar-details.saga';
// import { drivingLicenceSaga } from './driving-licence-details/driving-licence-details.saga';
// import { pancardDetailsSaga } from './pancard-details/pancard-details.saga';
// import { passportSaga } from './passport-details/passport-details.saga';
// import { rationCardDetailsSaga } from './ration-card-details/ration-card-details.saga';
// import { voterIdDetailsSaga } from './voter-id-details/voter-id-details.saga';

// // Operations
// import { collectionSaga } from './collections/collection.saga';
// import { auditingToolSaga } from './auditing-tool/auditing-tool.saga';
// import { centerSaga } from './center-list/center.saga';
// import { groupSaga } from './group/group.saga';
// import { memberCollectionSaga } from './member-collection/member-collection.saga';
// import { preDisbursementPhotoSaga } from './predisbursement-photo/predisbursement-photo.saga';
// import { nonKycMemberSaga } from './non-kyc-member/non-kyc-member.saga';
// import { officerCollectionSaga } from './officer-collection/officer-collection.saga';
// import { houseMemberVerifiedSaga } from './hvm-verified/hvm-verified.saga';
// import { memberRecheckSaga } from './member-recheck/member-recheck.saga';
// import { memberAccountSaga } from './member-account/member-account.saga';
// import { memberApproveSaga } from './member-approve/member-approve.saga';
// import { leadSaga } from './lead/lead.saga';
// import {businessbankDetailsSaga} from  './business/bank-details/bank-details.saga';
// import {branchDetailsSaga} from './business/branch-details/branch-details.saga';
// import {businessDetailsSaga} from './business/business-details/business-details.saga';
// import {partnerDetailsSaga} from './business/partner-details/partner-details.saga';
// import {proofDetailsSaga} from './business/proof-details/proof-details.saga';
// import {partiesDetailsSaga} from './business/related-parties/related-parties.saga';
// import {verificationDetailsSaga} from './business/verification-details/verification-details.saga';
// import {generalSaga} from './general/general.saga';

// // Setting
// import { settingsSaga } from './settings/settings.saga';
// import { officerSaga } from './officer/officer.saga';

export default function* rootSaga() {
	yield all([
		call(loginSaga),
		// call(dashboardSaga),
		
		// call(mobileNumberSaga),
		// call(memberDetailsSaga),
		// call(nomineeDetailsSaga),
		// call(personalDetailsSaga),
		// call(bankDetailsSaga),
		// call(basicDetailsSaga),
		// call(creditCheckDetailsSaga),
		// call(currentAddressSaga),
		// call(familyDetailSaga),
		// call(houseDetailsSaga),
		// call(housePhotosSaga),
		// call(nocPhotosSaga),
		// call(addMemberPhotoSaga),
		// call(residentialDetailsSaga),
		// call(signatureSaga),
		// call(verifyOtpSaga),
		// call(postCodeSaga),
		// call(coApplicantSaga),
		// call(extraInformationSaga),
		// call(officialDetailsSaga),
		// call(addressExtraProofSaga),
		// call(passbookChequeDetailsSaga),
		// call(otherDocumentSaga),
		// call(MemberBusinessSaga),

		// call(aadharDetailsSaga),
		// call(drivingLicenceSaga),
		// call(pancardDetailsSaga),
		// call(passportSaga),
		// call(rationCardDetailsSaga),
		// call(voterIdDetailsSaga),

		// call(collectionSaga),
		// call(memberCollectionSaga),
		// call(auditingToolSaga),
		// call(centerSaga),
		// call(groupSaga),
		// call(officerSaga),
		// call(preDisbursementPhotoSaga),
		// call(nonKycMemberSaga),
		// call(officerCollectionSaga),
		// call(houseMemberVerifiedSaga),
		// call(settingsSaga),
		// call(memberRecheckSaga),
		// call(memberAccountSaga),
		// call(memberApproveSaga),
		// call(leadSaga),
		// call(businessbankDetailsSaga),
		// call(branchDetailsSaga),
		// call(businessDetailsSaga),
		// call(partnerDetailsSaga),
		// call(proofDetailsSaga),
		// call(partiesDetailsSaga),
		// call(verificationDetailsSaga),
		// call(generalSaga),
    ]);
}