export type COUNTRY_CODE = "AF"|"AX"|"AL"|"DZ"|"AS"|"AD"|"AO"|"AI"|"AQ"|"AG"|"AR"|"AM"|"AW"|"AU"|"AT"|"AZ"|"BS"|"BH"|"BD"|"BB"|"BY"|"BE"|"BZ"|"BJ"|"BM"|"BT"|"BO"|"BA"|"BW"|"BR"|"IO"|"BN"|"BG"|"BF"|"BI"|"KH"|"CM"|"CA"|"CV"|"KY"|"CF"|"TD"|"CL"|"CN"|"CX"|"CC"|"CO"|"KM"|"CG"|"CD"|"CK"|"CR"|"CI"|"HR"|"CU"|"CY"|"CZ"|"DK"|"DJ"|"DM"|"DO"|"EC"|"EG"|"SV"|"GQ"|"ER"|"EE"|"ET"|"FK"|"FO"|"FJ"|"FI"|"FR"|"GF"|"PF"|"GA"|"GM"|"GE"|"DE"|"GH"|"GI"|"GR"|"GL"|"GD"|"GP"|"GU"|"GT"|"GG"|"GN"|"GW"|"GY"|"HT"|"VA"|"HN"|"HK"|"HU"|"IS"|"IN"|"ID"|"IR"|"IQ"|"IE"|"IM"|"IL"|"IT"|"JM"|"JP"|"JE"|"JO"|"KZ"|"KE"|"KI"|"KP"|"KR"|"KW"|"KG"|"LA"|"LV"|"LB"|"LS"|"LR"|"LY"|"LI"|"LT"|"LU"|"MO"|"MK"|"MG"|"MW"|"MY"|"MV"|"ML"|"MT"|"MH"|"MQ"|"MR"|"MU"|"YT"|"MX"|"FM"|"MD"|"MC"|"MN"|"ME"|"MS"|"MA"|"MZ"|"MM"|"NA"|"NR"|"NP"|"NL"|"AN"|"NC"|"NZ"|"NI"|"NE"|"NG"|"NU"|"NF"|"MP"|"NO"|"OM"|"PK"|"PW"|"PS"|"PA"|"PG"|"PY"|"PE"|"PH"|"PN"|"PL"|"PT"|"PR"|"QA"|"RO"|"RU"|"RW"|"RE"|"BL"|"SH"|"KN"|"LC"|"MF"|"PM"|"VC"|"WS"|"SM"|"ST"|"SA"|"SN"|"RS"|"SC"|"SL"|"SG"|"SK"|"SI"|"SB"|"SO"|"ZA"|"SS"|"GS"|"ES"|"LK"|"SD"|"SR"|"SJ"|"SZ"|"SE"|"CH"|"SY"|"TW"|"TJ"|"TZ"|"TH"|"TL"|"TG"|"TK"|"TO"|"TT"|"TN"|"TR"|"TM"|"TC"|"TV"|"UG"|"UA"|"AE"|"GB"|"US"|"UY"|"UZ"|"VU"|"VE"|"VN"|"VG"|"VI"|"WF"|"YE"|"ZM"|"ZW";

export interface COUNTRY_CODE_DATA{
  name:string,
  dialCode:string,
  code:COUNTRY_CODE,
  notes:string|null,
  numberFormat: {
    min:number,
    max:number,
  }
  prefixes: Array<{number:string, carrier:string|null, note:string|null}>
}

export const countryCodeList:COUNTRY_CODE_DATA[] = [
  {
    "name": "Afghanistan",
    "dialCode": "+93",
    "code": "AF",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 9
    },
    "prefixes": []
  },
  {
    "name": "Albania",
    "dialCode": "+355",
    "code": "AL",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 3
    },
    "prefixes": []
  },
  {
    "name": "Algeria",
    "dialCode": "+213",
    "code": "DZ",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 8
    },
    "prefixes": [
      {
        "number": "5",
        "carrier": "Vodafone Algeria",
        "note": "2134"
      },
      {
        "number": "6",
        "carrier": "Mobilis-Algerie Telecom",
        "note": "2136"
      },
      {
        "number": "7",
        "carrier": "Djezzy Algerie",
        "note": "2137"
      },
      {
        "number": "9",
        "carrier": "Ooredoo Algerie",
        "note": "2135"
      }
    ]
  },
  {
    "name": "Andorra",
    "dialCode": "+376",
    "code": "AD",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 6
    },
    "prefixes": [
      {
        "number": "3",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Angola",
    "dialCode": "+244",
    "code": "AO",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 9
    },
    "prefixes": [
      {
        "number": "91",
        "carrier": "MOVICEL - CDMA",
        "note": null
      },
      {
        "number": "92",
        "carrier": "UNITEL - GSM",
        "note": null
      },
      {
        "number": "93",
        "carrier": "UNITEL - GSM",
        "note": null
      }
    ]
  },
  {
    "name": "Anguilla",
    "dialCode": "+1264",
    "code": "AI",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 10
    },
    "prefixes": [
      {
        "number": "264772",
        "carrier": null,
        "note": "NANP member"
      }
    ]
  },
  {
    "name": "Antigua and Barbuda",
    "dialCode": "+1268",
    "code": "AG",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 10
    },
    "prefixes": [
      {
        "number": "2687",
        "carrier": null,
        "note": "NANP member"
      }
    ]
  },
  {
    "name": "Argentina",
    "dialCode": "+54",
    "code": "AR",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 10
    },
    "prefixes": [
      {
        "number": "9",
        "carrier": "All carriers: Claro, Movistar, Personal, Tuenti",
        "note": "15 before the local number but after long distance area code for national calls (0 11 15 xxxx-xxxx) and 9 placed after the international access code excluding the 15 for international calls (+54 9 11 xxxx-xxxx)."
      },
      {
        "number": "15",
        "carrier": "All carriers: Claro, Movistar, Personal, Tuenti",
        "note": "15 before the local number but after long distance area code for national calls (0 11 15 xxxx-xxxx) and 9 placed after the international access code excluding the 15 for international calls (+54 9 11 xxxx-xxxx)."
      }
    ]
  },
  {
    "name": "Armenia",
    "dialCode": "+374",
    "code": "AM",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 8
    },
    "prefixes": [
      {
        "number": "55",
        "carrier": "Ucom",
        "note": null
      },
      {
        "number": "95",
        "carrier": "Ucom",
        "note": null
      },
      {
        "number": "41",
        "carrier": "Ucom",
        "note": null
      },
      {
        "number": "44",
        "carrier": "Ucom",
        "note": null
      },
      {
        "number": "77",
        "carrier": "VivaCell-MTS",
        "note": null
      },
      {
        "number": "93",
        "carrier": "VivaCell-MTS",
        "note": null
      },
      {
        "number": "94",
        "carrier": "VivaCell-MTS",
        "note": null
      },
      {
        "number": "98",
        "carrier": "VivaCell-MTS",
        "note": null
      },
      {
        "number": "91",
        "carrier": "Beeline Armenia",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix."
      },
      {
        "number": "99",
        "carrier": "Beeline Armenia",
        "note": null
      },
      {
        "number": "43",
        "carrier": "Beeline Armenia",
        "note": null
      },
      {
        "number": "97",
        "carrier": "Karabakh Telecom",
        "note": null
      }
    ]
  },
  {
    "name": "Aruba",
    "dialCode": "+297",
    "code": "AW",
    "notes": null,
    "numberFormat": {
      max: 7,
      "min": 7
    },
    "prefixes": []
  },
  {
    "name": "Australia",
    "dialCode": "+61",
    "code": "AU",
    "notes": "Includes Cocos-Keeling Islands(UTC+6.30) and Christmas Island (UTC+7). Western Australia (UTC+8).",
    "numberFormat": {
      max: 15,
      "min": 5
    },
    "prefixes": [
      {
        "number": "4",
        "carrier": "any",
        "note": "Although distinct mobile prefixes are allocated to different providers, the prefixes cannot be used to reliably determine the carrier, due to Mobile number portability from one network to another."
      }
    ]
  },
  {
    "name": "Austria",
    "dialCode": "+43",
    "code": "AT",
    "notes": null,
    "numberFormat": {
      max: 13,
      "min": 4
    },
    "prefixes": [
      {
        "number": "650",
        "carrier": "T-Mobile Austria GmbH (telering)",
        "note": null
      },
      {
        "number": "660",
        "carrier": "Hutchison 3G Austria GmbH (drei)",
        "note": null
      },
      {
        "number": "664",
        "carrier": "mobilkom Austria AG (Mobilkom, A1)",
        "note": null
      },
      {
        "number": "676",
        "carrier": "T-Mobile Austria GmbH (T-Mobile, formerly max)",
        "note": null
      },
      {
        "number": "680",
        "carrier": "mobilkom Austria AG (Bob)",
        "note": null
      },
      {
        "number": "677",
        "carrier": "HoT (T-Mobile, formerly max)",
        "note": null
      },
      {
        "number": "681",
        "carrier": "-! Telekommunikation GmbH",
        "note": null
      },
      {
        "number": "688",
        "carrier": "Tele2 Mobil",
        "note": null
      },
      {
        "number": "699",
        "carrier": "Hutchison 3G Austria GmbH (drei) formerly Orange Austria (Orange [formerly ONE], Yesss)",
        "note": null
      }
    ]
  },
  {
    "name": "Azerbaijan",
    "dialCode": "+994",
    "code": "AZ",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 8
    },
    "prefixes": [
      {
        "number": "10",
        "carrier": "Azercell",
        "note": null
      },
      {
        "number": "50",
        "carrier": "Azercell",
        "note": null
      },
      {
        "number": "51",
        "carrier": "Azercell",
        "note": null
      },
      {
        "number": "55",
        "carrier": "Bakcell",
        "note": null
      },
      {
        "number": "70",
        "carrier": "Nar Mobile",
        "note": null
      },
      {
        "number": "77",
        "carrier": "Nar Mobile",
        "note": null
      },
      {
        "number": "99",
        "carrier": "Bakcell",
        "note": null
      }
    ]
  },
  {
    "name": "Bahamas",
    "dialCode": "+1242",
    "code": "BS",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 10
    },
    "prefixes": [
      {
        "number": "24235",
        "carrier": null,
        "note": "NANP member"
      },
      {
        "number": "24245",
        "carrier": null,
        "note": "NANP member"
      },
      {
        "number": "24255",
        "carrier": null,
        "note": "NANP member"
      }
    ]
  },
  {
    "name": "Bahrain",
    "dialCode": "+973",
    "code": "BH",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 8
    },
    "prefixes": [
      {
        "number": "31",
        "carrier": "Royal Court",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      },
      {
        "number": "322",
        "carrier": "Batelco",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      },
      {
        "number": "33",
        "carrier": "Viva",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      },
      {
        "number": "340",
        "carrier": "Viva",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      },
      {
        "number": "341",
        "carrier": "Viva",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      },
      {
        "number": "343",
        "carrier": "Viva",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      },
      {
        "number": "344",
        "carrier": "Viva",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      },
      {
        "number": "345",
        "carrier": "Viva",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      },
      {
        "number": "353",
        "carrier": "Viva",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      },
      {
        "number": "355",
        "carrier": "Viva",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      },
      {
        "number": "36",
        "carrier": "Zain",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      },
      {
        "number": "377",
        "carrier": "Zain",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      },
      {
        "number": "383",
        "carrier": "Batelco",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      },
      {
        "number": "384",
        "carrier": "Batelco",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      },
      {
        "number": "388",
        "carrier": "Batelco",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      },
      {
        "number": "39",
        "carrier": "Batelco",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      },
      {
        "number": "663",
        "carrier": "Zain",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      },
      {
        "number": "666",
        "carrier": "Zain",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      },
      {
        "number": "669",
        "carrier": "Zain",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      }
    ]
  },
  {
    "name": "Bangladesh",
    "dialCode": "+880",
    "code": "BD",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 6
    },
    "prefixes": [
      {
        "number": "13",
        "carrier": "GrameenPhone",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix (so prefixes are not tightly coupled to a specific \ncarrier)."
      },
      {
        "number": "14",
        "carrier": "Banglalink",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix (so prefixes are not tightly coupled to a specific \ncarrier)."
      },
      {
        "number": "15",
        "carrier": "Teletalk",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix (so prefixes are not tightly coupled to a specific \ncarrier)."
      },
      {
        "number": "16",
        "carrier": "Airtel",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix (so prefixes are not tightly coupled to a specific \ncarrier)."
      },
      {
        "number": "17",
        "carrier": "GrameenPhone",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix (so prefixes are not tightly coupled to a specific \ncarrier)."
      },
      {
        "number": "18",
        "carrier": "Robi",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix (so prefixes are not tightly coupled to a specific \ncarrier)."
      },
      {
        "number": "19",
        "carrier": "Banglalink",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix (so prefixes are not tightly coupled to a specific \ncarrier)."
      }
    ]
  },
  {
    "name": "Barbados",
    "dialCode": "+1246",
    "code": "BB",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 10
    },
    "prefixes": [
      {
        "number": "246",
        "carrier": "AT&T Wireless (formerly)",
        "note": "NANP member, no mobile-specific prefix"
      },
      {
        "number": "246",
        "carrier": "Digicel",
        "note": "NANP member, no mobile-specific prefix"
      },
      {
        "number": "246",
        "carrier": "LIME",
        "note": "NANP member, no mobile-specific prefix"
      },
      {
        "number": "246",
        "carrier": "Sunbeach",
        "note": "NANP member, no mobile-specific prefix"
      }
    ]
  },
  {
    "name": "Belarus",
    "dialCode": "+375",
    "code": "BY",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 9
    },
    "prefixes": [
      {
        "number": "25",
        "carrier": "life:)",
        "note": "Users can switch carriers while keeping number and prefix (so prefixes are not tightly coupled to a specific carrier)."
      },
      {
        "number": "291",
        "carrier": "A1",
        "note": "Users can switch carriers while keeping number and prefix (so prefixes are not tightly coupled to a specific carrier)."
      },
      {
        "number": "292",
        "carrier": "MTS",
        "note": "Users can switch carriers while keeping number and prefix (so prefixes are not tightly coupled to a specific carrier)."
      },
      {
        "number": "293",
        "carrier": "A1",
        "note": "Users can switch carriers while keeping number and prefix (so prefixes are not tightly coupled to a specific carrier)."
      },
      {
        "number": "294",
        "carrier": "DIALLOG (not in use; closed in 2014)",
        "note": "Users can switch carriers while keeping number and prefix (so prefixes are not tightly coupled to a specific carrier)."
      },
      {
        "number": "295",
        "carrier": "MTS",
        "note": "Users can switch carriers while keeping number and prefix (so prefixes are not tightly coupled to a specific carrier)."
      },
      {
        "number": "296",
        "carrier": "A1",
        "note": "Users can switch carriers while keeping number and prefix (so prefixes are not tightly coupled to a specific carrier)."
      },
      {
        "number": "297",
        "carrier": "MTS",
        "note": "Users can switch carriers while keeping number and prefix (so prefixes are not tightly coupled to a specific carrier)."
      },
      {
        "number": "298",
        "carrier": "MTS",
        "note": "Users can switch carriers while keeping number and prefix (so prefixes are not tightly coupled to a specific carrier)."
      },
      {
        "number": "299",
        "carrier": "A1",
        "note": "Users can switch carriers while keeping number and prefix (so prefixes are not tightly coupled to a specific carrier)."
      },
      {
        "number": "33",
        "carrier": "MTS",
        "note": "Users can switch carriers while keeping number and prefix (so prefixes are not tightly coupled to a specific carrier)."
      },
      {
        "number": "44",
        "carrier": "A1",
        "note": "Users can switch carriers while keeping number and prefix (so prefixes are not tightly coupled to a specific carrier)."
      }
    ]
  },
  {
    "name": "Belgium",
    "dialCode": "+32",
    "code": "BE",
    "notes": "The '0' is used on all domestic calls, including in the same city, but is omitted when dialling from other countries.",
    "numberFormat": {
      max: 9,
      "min": 8
    },
    "prefixes": [
      {
        "number": "456",
        "carrier": "Unleashed (Mobile Vikings / JIM Mobile) (or other)",
        "note": "Users can switch carriers while keeping number and prefix (so prefixes are not tightly coupled to a specific carrier).\n\nIf there is only 32.. followed by any other, shorter number, like 32 51 724859, this is the number of a normal phone, not a mobile."
      },
      {
        "number": "46",
        "carrier": "Join (discontinued mobile phone service provider) [3]",
        "note": "Users can switch carriers while keeping number and prefix (so prefixes are not tightly coupled to a specific carrier).\n\nIf there is only 32.. followed by any other, shorter number, like 32 51 724859, this is the number of a normal phone, not a mobile."
      },
      {
        "number": "47",
        "carrier": "Proximus (or other)",
        "note": "Users can switch carriers while keeping number and prefix (so prefixes are not tightly coupled to a specific carrier).\n\nIf there is only 32.. followed by any other, shorter number, like 32 51 724859, this is the number of a normal phone, not a mobile."
      },
      {
        "number": "48",
        "carrier": "Telenet/Base (or other)",
        "note": "Users can switch carriers while keeping number and prefix (so prefixes are not tightly coupled to a specific carrier).\n\nIf there is only 32.. followed by any other, shorter number, like 32 51 724859, this is the number of a normal phone, not a mobile."
      },
      {
        "number": "49",
        "carrier": "Orange Belgium (or other)",
        "note": null
      }
    ]
  },
  {
    "name": "Belize",
    "dialCode": "+501",
    "code": "BZ",
    "notes": null,
    "numberFormat": {
      max: 7,
      "min": 7
    },
    "prefixes": [
      {
        "number": "6",
        "carrier": "Mobile Smart",
        "note": null
      }
    ]
  },
  {
    "name": "Benin",
    "dialCode": "+229",
    "code": "BJ",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 8
    },
    "prefixes": [
      {
        "number": "9",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Bermuda",
    "dialCode": "+1441",
    "code": "BM",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 10
    },
    "prefixes": [
      {
        "number": "441",
        "carrier": null,
        "note": "NANP member, no mobile-specific prefix"
      }
    ]
  },
  {
    "name": "Bhutan",
    "dialCode": "+975",
    "code": "BT",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 7
    },
    "prefixes": [
      {
        "number": "17",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Bosnia and Herzegovina",
    "dialCode": "+387",
    "code": "BA",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 8
    },
    "prefixes": [
      {
        "number": "60",
        "carrier": "BH Mobile",
        "note": "Due to Mobile number portability the prefix of an existing number does not determine the carrier. Any new number will follow the numbering plan."
      },
      {
        "number": "61",
        "carrier": "BH Mobile",
        "note": "Due to Mobile number portability the prefix of an existing number does not determine the carrier. Any new number will follow the numbering plan."
      },
      {
        "number": "62",
        "carrier": "BH Mobile",
        "note": "Due to Mobile number portability the prefix of an existing number does not determine the carrier. Any new number will follow the numbering plan."
      },
      {
        "number": "63",
        "carrier": "ERONET (HT)",
        "note": "Due to Mobile number portability the prefix of an existing number does not determine the carrier. Any new number will follow the numbering plan."
      },
      {
        "number": "64",
        "carrier": "haloo",
        "note": "Due to Mobile number portability the prefix of an existing number does not determine the carrier. Any new number will follow the numbering plan."
      },
      {
        "number": "65",
        "carrier": "m:tel",
        "note": "Due to Mobile number portability the prefix of an existing number does not determine the carrier. Any new number will follow the numbering plan."
      },
      {
        "number": "66",
        "carrier": "m:tel",
        "note": "Due to Mobile number portability the prefix of an existing number does not determine the carrier. Any new number will follow the numbering plan."
      },
      {
        "number": "67",
        "carrier": "Novotel",
        "note": "Due to Mobile number portability the prefix of an existing number does not determine the carrier. Any new number will follow the numbering plan."
      }
    ]
  },
  {
    "name": "Botswana",
    "dialCode": "+267",
    "code": "BW",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 7
    },
    "prefixes": [
      {
        "number": "7",
        "carrier": "Mascom",
        "note": null
      }
    ]
  },
  {
    "name": "Brazil",
    "dialCode": "+55",
    "code": "BR",
    "notes": "Other states UTC-3 (no change).",
    "numberFormat": {
      max: 10,
      "min": 10
    },
    "prefixes": [
      {
        "number": "6",
        "carrier": null,
        "note": "Mobile phones use geographic area codes (two digits): after that, all numbers assigned to mobile service have nine digits, starting with 6, 7, 8 or 9 (example: 55 15 99999–9999). 90 is not possible, because collect calls start with this number.[5]"
      },
      {
        "number": "7",
        "carrier": null,
        "note": "Mobile phones use geographic area codes (two digits): after that, all numbers assigned to mobile service have nine digits, starting with 6, 7, 8 or 9 (example: 55 15 99999–9999). 90 is not possible, because collect calls start with this number.[5]"
      },
      {
        "number": "8",
        "carrier": null,
        "note": "Mobile phones use geographic area codes (two digits): after that, all numbers assigned to mobile service have nine digits, starting with 6, 7, 8 or 9 (example: 55 15 99999–9999). 90 is not possible, because collect calls start with this number.[5]"
      },
      {
        "number": "9",
        "carrier": null,
        "note": "Mobile phones use geographic area codes (two digits): after that, all numbers assigned to mobile service have nine digits, starting with 6, 7, 8 or 9 (example: 55 15 99999–9999). 90 is not possible, because collect calls start with this number.[5]"
      }
    ]
  },
  {
    "name": "Bulgaria",
    "dialCode": "+359",
    "code": "BG",
    "notes": "The '0' is used on all domestic calls, including in the same city, but is omitted when dialling from other countries.",
    "numberFormat": {
      max: 9,
      "min": 7
    },
    "prefixes": [
      {
        "number": "48",
        "carrier": "Mobikom (now defunct)",
        "note": null
      },
      {
        "number": "87",
        "carrier": "Vivacom",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      },
      {
        "number": "88",
        "carrier": "A1 Bulgaria",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      },
      {
        "number": "89",
        "carrier": "Telenor (Bulgaria)",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      },
      {
        "number": "988",
        "carrier": "Other mobile networks",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      }
    ]
  },
  {
    "name": "Burkina Faso",
    "dialCode": "+226",
    "code": "BF",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 8
    },
    "prefixes": [
      {
        "number": "70",
        "carrier": "Telmob",
        "note": null
      },
      {
        "number": "71",
        "carrier": "Telmob",
        "note": null
      },
      {
        "number": "72",
        "carrier": "Telmob",
        "note": null
      },
      {
        "number": "74",
        "carrier": "Celtel",
        "note": null
      },
      {
        "number": "75",
        "carrier": "Celtel",
        "note": null
      },
      {
        "number": "77",
        "carrier": "Celtel",
        "note": null
      },
      {
        "number": "78",
        "carrier": "Telecel",
        "note": null
      },
      {
        "number": "79",
        "carrier": "Telecel",
        "note": null
      }
    ]
  },
  {
    "name": "Burundi",
    "dialCode": "+257",
    "code": "BI",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 8
    },
    "prefixes": [
      {
        "number": "7",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Cambodia",
    "dialCode": "+855",
    "code": "KH",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 8
    },
    "prefixes": [
      {
        "number": "92",
        "carrier": "Cellcard",
        "note": null
      },
      {
        "number": "12",
        "carrier": "Cellcard",
        "note": null
      },
      {
        "number": "11",
        "carrier": "Cellcard",
        "note": null
      },
      {
        "number": "76",
        "carrier": "Cellcard",
        "note": null
      },
      {
        "number": "77",
        "carrier": "Cellcard",
        "note": null
      },
      {
        "number": "99",
        "carrier": "Cellcard",
        "note": null
      },
      {
        "number": "10",
        "carrier": "Smart",
        "note": null
      },
      {
        "number": "15",
        "carrier": "Smart",
        "note": null
      },
      {
        "number": "16",
        "carrier": "Smart",
        "note": null
      },
      {
        "number": "69",
        "carrier": "Smart",
        "note": null
      },
      {
        "number": "70",
        "carrier": "Smart",
        "note": null
      },
      {
        "number": "81",
        "carrier": "Smart",
        "note": null
      },
      {
        "number": "86",
        "carrier": "Smart",
        "note": null
      },
      {
        "number": "87",
        "carrier": "Smart",
        "note": null
      },
      {
        "number": "93",
        "carrier": "Smart",
        "note": null
      },
      {
        "number": "96",
        "carrier": "Smart",
        "note": null
      },
      {
        "number": "98",
        "carrier": "Smart",
        "note": null
      }
    ]
  },
  {
    "name": "Cameroon",
    "dialCode": "+237",
    "code": "CM",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 8
    },
    "prefixes": [
      {
        "number": "7",
        "carrier": "MTN",
        "note": null
      },
      {
        "number": "9",
        "carrier": "Orange",
        "note": null
      }
    ]
  },
  {
    "name": "Canada",
    "dialCode": "+1",
    "code": "CA",
    "notes": "Alberta UTC-7/DST-6; British Columbia UTC-8/DST-7; Manitoba UTC-6/DST-5; New Brunswick, Nova Scotia UTC-4/DST-3;Newfoundland UTC-3.30/DST-2.30; Ontario, Quebec UTC-5/DST-4.",
    "numberFormat": {
      max: 10,
      "min": 10
    },
    "prefixes": [
      {
        "number": "n/a",
        "carrier": null,
        "note": "Mobile phones use geographic area codes. Exchanges may service on mobile devices; local numbers are portable between wired and wireless carriers. While area code 600 has been established as a non-geographic code that can be used by mobile phones, the only significant mobile usage has been for satellite phone service in remote regions."
      }
    ]
  },
  {
    "name": "Cape Verde",
    "dialCode": "+238",
    "code": "CV",
    "notes": null,
    "numberFormat": {
      max: 7,
      "min": 7
    },
    "prefixes": [
      {
        "number": "9",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Cayman Islands",
    "dialCode": "+ 345",
    "code": "KY",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 10
    },
    "prefixes": [
      {
        "number": "345",
        "carrier": null,
        "note": "NANP member, no mobile-specific prefix"
      }
    ]
  },
  {
    "name": "Central African Republic",
    "dialCode": "+236",
    "code": "CF",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 8
    },
    "prefixes": [
      {
        "number": "75",
        "carrier": "Telecel",
        "note": null
      }
    ]
  },
  {
    "name": "Chad",
    "dialCode": "+235",
    "code": "TD",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 8
    },
    "prefixes": [
      {
        "number": "66",
        "carrier": "Airtel",
        "note": null
      },
      {
        "number": "63",
        "carrier": "Airtel",
        "note": null
      },
      {
        "number": "65",
        "carrier": "Airtel",
        "note": null
      },
      {
        "number": "99",
        "carrier": "Tigo",
        "note": null
      },
      {
        "number": "95",
        "carrier": "Tigo",
        "note": null
      },
      {
        "number": "93",
        "carrier": "Tigo",
        "note": null
      },
      {
        "number": "90",
        "carrier": "Tigo",
        "note": null
      },
      {
        "number": "77",
        "carrier": "Salamat",
        "note": null
      }
    ]
  },
  {
    "name": "Chile",
    "dialCode": "+56",
    "code": "CL",
    "notes": "YZ : long-distance operator code.",
    "numberFormat": {
      max: 9,
      "min": 8
    },
    "prefixes": [
      {
        "number": "9",
        "carrier": "All carriers: Movistar, Claro, Entel, WOM, Virgin Mobile, etc.",
        "note": "Example: 56 9 1234 5678 dialed from Chilean or foreign mobile phones, with or without blank spaces."
      }
    ]
  },
  {
    "name": "China",
    "dialCode": "+86",
    "code": "CN",
    "notes": null,
    "numberFormat": {
      max: 12,
      "min": 5
    },
    "prefixes": []
  },
  {
    "name": "Colombia",
    "dialCode": "+57",
    "code": "CO",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 8
    },
    "prefixes": [
      {
        "number": "30",
        "carrier": "Tigo",
        "note": null
      },
      {
        "number": "310",
        "carrier": "Claro",
        "note": null
      },
      {
        "number": "311",
        "carrier": "Claro",
        "note": null
      },
      {
        "number": "312",
        "carrier": "Claro",
        "note": null
      },
      {
        "number": "313",
        "carrier": "Claro",
        "note": null
      },
      {
        "number": "314",
        "carrier": "Claro",
        "note": null
      },
      {
        "number": "315",
        "carrier": "Movistar",
        "note": null
      },
      {
        "number": "316",
        "carrier": "Movistar",
        "note": null
      },
      {
        "number": "317",
        "carrier": "Movistar",
        "note": null
      },
      {
        "number": "318",
        "carrier": "Movistar",
        "note": null
      },
      {
        "number": "319",
        "carrier": "Movistar",
        "note": "Operated by Virgin Mobile"
      },
      {
        "number": "32",
        "carrier": "Claro",
        "note": null
      },
      {
        "number": "350, 351",
        "carrier": "Avantel",
        "note": null
      }
    ]
  },
  {
    "name": "Comoros",
    "dialCode": "+269",
    "code": "KM",
    "notes": null,
    "numberFormat": {
      max: 7,
      "min": 7
    },
    "prefixes": [
      {
        "number": "3",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Cook Islands",
    "dialCode": "+682",
    "code": "CK",
    "notes": null,
    "numberFormat": {
      max: 5,
      "min": 5
    },
    "prefixes": [
      {
        "number": "5",
        "carrier": null,
        "note": null
      },
      {
        "number": "7",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Costa Rica",
    "dialCode": "+506",
    "code": "CR",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 8
    },
    "prefixes": [
      {
        "number": "6",
        "carrier": "Movistar",
        "note": "Users can switch carriers while keeping number and prefix (so prefixes are not tightly coupled to a specific carrier)."
      },
      {
        "number": "7",
        "carrier": "Claro",
        "note": "Users can switch carriers while keeping number and prefix (so prefixes are not tightly coupled to a specific carrier)."
      },
      {
        "number": "8",
        "carrier": "Instituto Costarricense de Electricidad (Kölbi)",
        "note": "Users can switch carriers while keeping number and prefix (so prefixes are not tightly coupled to a specific carrier)."
      }
    ]
  },
  {
    "name": "Croatia",
    "dialCode": "+385",
    "code": "HR",
    "notes": null,
    "numberFormat": {
      max: 12,
      "min": 8
    },
    "prefixes": [
      {
        "number": "91",
        "carrier": "A1 Hrvatska",
        "note": "Due to Mobile number portability the prefix of an existing number does not determine the carrier. Any new number will follow the numbering plan."
      },
      {
        "number": "92",
        "carrier": "Tomato",
        "note": "Due to Mobile number portability the prefix of an existing number does not determine the carrier. Any new number will follow the numbering plan."
      },
      {
        "number": "95",
        "carrier": "Telemach",
        "note": "Due to Mobile number portability the prefix of an existing number does not determine the carrier. Any new number will follow the numbering plan."
      },
      {
        "number": "97",
        "carrier": "bonbon",
        "note": "Due to Mobile number portability the prefix of an existing number does not determine the carrier. Any new number will follow the numbering plan."
      },
      {
        "number": "98",
        "carrier": "HT",
        "note": "Due to Mobile number portability the prefix of an existing number does not determine the carrier. Any new number will follow the numbering plan."
      },
      {
        "number": "99",
        "carrier": "HT",
        "note": "Due to Mobile number portability the prefix of an existing number does not determine the carrier. Any new number will follow the numbering plan."
      }
    ]
  },
  {
    "name": "Cuba",
    "dialCode": "+53",
    "code": "CU",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 6
    },
    "prefixes": [
      {
        "number": "5",
        "carrier": "ETECSA",
        "note": null
      }
    ]
  },
  {
    "name": "Cyprus",
    "dialCode": "+357",
    "code": "CY",
    "notes": "11 digits for voice-mail services only.",
    "numberFormat": {
      max: 11,
      "min": 8
    },
    "prefixes": [
      {
        "number": "94",
        "carrier": "LemonTel",
        "note": "a subsidiary of Cablenet"
      },
      {
        "number": "95",
        "carrier": "PrimeTel",
        "note": null
      },
      {
        "number": "96",
        "carrier": "MTN",
        "note": "was called Areeba until 2007"
      },
      {
        "number": "97",
        "carrier": "Cytamobile-Vodafone",
        "note": "a subsidiary of Cyta"
      },
      {
        "number": "99",
        "carrier": "Cytamobile-Vodafone",
        "note": "a subsidiary of Cyta"
      }
    ]
  },
  {
    "name": "Czech Republic",
    "dialCode": "+420",
    "code": "CZ",
    "notes": null,
    "numberFormat": {
      max: 12,
      "min": 4
    },
    "prefixes": [
      {
        "number": "601",
        "carrier": "Telefónica O2",
        "note": null
      },
      {
        "number": "602",
        "carrier": "Telefónica O2",
        "note": null
      },
      {
        "number": "603",
        "carrier": "T-Mobile",
        "note": null
      },
      {
        "number": "604",
        "carrier": "T-Mobile",
        "note": null
      },
      {
        "number": "605",
        "carrier": "T-Mobile",
        "note": null
      },
      {
        "number": "606",
        "carrier": "Telefónica O2",
        "note": null
      },
      {
        "number": "607",
        "carrier": "Telefónica O2",
        "note": null
      },
      {
        "number": "608",
        "carrier": "Vodafone",
        "note": null
      },
      {
        "number": "702",
        "carrier": "Telefónica O2",
        "note": null
      },
      {
        "number": "72",
        "carrier": "Telefónica O2",
        "note": null
      },
      {
        "number": "73",
        "carrier": "T-Mobile",
        "note": "Except 730."
      },
      {
        "number": "77",
        "carrier": "Vodafone",
        "note": null
      },
      {
        "number": "790",
        "carrier": "U:fon",
        "note": "Except 79023, 79044, 79066, 79088."
      }
    ]
  },
  {
    "name": "Denmark",
    "dialCode": "+45",
    "code": "DK",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 8
    },
    "prefixes": [
      {
        "number": "2",
        "carrier": "TDC",
        "note": null
      },
      {
        "number": "30",
        "carrier": null,
        "note": null
      },
      {
        "number": "31",
        "carrier": null,
        "note": null
      },
      {
        "number": "40",
        "carrier": null,
        "note": null
      },
      {
        "number": "41",
        "carrier": null,
        "note": null
      },
      {
        "number": "42",
        "carrier": null,
        "note": null
      },
      {
        "number": "50",
        "carrier": "Telenor",
        "note": null
      },
      {
        "number": "51",
        "carrier": null,
        "note": null
      },
      {
        "number": "52",
        "carrier": null,
        "note": null
      },
      {
        "number": "53",
        "carrier": null,
        "note": null
      },
      {
        "number": "60",
        "carrier": null,
        "note": null
      },
      {
        "number": "61",
        "carrier": null,
        "note": null
      },
      {
        "number": "71",
        "carrier": null,
        "note": null
      },
      {
        "number": "81",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Djibouti",
    "dialCode": "+253",
    "code": "DJ",
    "notes": null,
    "numberFormat": {
      max: 6,
      "min": 6
    },
    "prefixes": [
      {
        "number": "8",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Dominica",
    "dialCode": "+1767",
    "code": "DM",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 10
    },
    "prefixes": [
      {
        "number": "767 2",
        "carrier": null,
        "note": "NANP member"
      }
    ]
  },
  {
    "name": "Dominican Republic",
    "dialCode": "+1849",
    "code": "DO",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 10
    },
    "prefixes": [
      {
        "number": "809",
        "carrier": null,
        "note": "NANP member, no mobile-specific prefix"
      },
      {
        "number": "829",
        "carrier": null,
        "note": "NANP member, no mobile-specific prefix"
      },
      {
        "number": "849",
        "carrier": null,
        "note": "NANP member, no mobile-specific prefix"
      }
    ]
  },
  {
    "name": "Ecuador",
    "dialCode": "+593",
    "code": "EC",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 8
    },
    "prefixes": [
      {
        "number": "8",
        "carrier": null,
        "note": "newest lines"
      },
      {
        "number": "9",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Egypt",
    "dialCode": "+20",
    "code": "EG",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 7
    },
    "prefixes": [
      {
        "number": "10",
        "carrier": "Vodafone",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix.\nAn additional digit has been added to the code of every carrier. Making a single code per carrier, after each carrier had to have multiple codes. And making the NSN 10 digits after it was 9.\nDialing format inside Egypt is 01X XXXX XXXX, International format is 20 1X XXXX XXXX"
      },
      {
        "number": "11",
        "carrier": "Etisalat",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix.\nAn additional digit has been added to the code of every carrier. Making a single code per carrier, after each carrier had to have multiple codes. And making the NSN 10 digits after it was 9.\nDialing format inside Egypt is 01X XXXX XXXX, International format is 20 1X XXXX XXXX"
      },
      {
        "number": "12",
        "carrier": "Orange Egypt",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix.\nAn additional digit has been added to the code of every carrier. Making a single code per carrier, after each carrier had to have multiple codes. And making the NSN 10 digits after it was 9.\nDialing format inside Egypt is 01X XXXX XXXX, International format is 20 1X XXXX XXXX"
      },
      {
        "number": "15",
        "carrier": "WE Egypt",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix.\nAn additional digit has been added to the code of every carrier. Making a single code per carrier, after each carrier had to have multiple codes. And making the NSN 10 digits after it was 9.\nDialing format inside Egypt is 01X XXXX XXXX, International format is 20 1X XXXX XXXX"
      }
    ]
  },
  {
    "name": "El Salvador",
    "dialCode": "+503",
    "code": "SV",
    "notes": "The seven and eleven digit schemes are solely for numbers that do not entail any charge for the subscriber making the call (800) or for numbers that involve a surcharge for subscriber A (900). All other numbers have a fixed eight digit scheme.",
    "numberFormat": {
      max: 11,
      "min": 7
    },
    "prefixes": [
      {
        "number": "6",
        "carrier": null,
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix."
      },
      {
        "number": "7",
        "carrier": null,
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix."
      }
    ]
  },
  {
    "name": "Equatorial Guinea",
    "dialCode": "+240",
    "code": "GQ",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 9
    },
    "prefixes": [
      {
        "number": "2",
        "carrier": null,
        "note": null
      },
      {
        "number": "7",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Eritrea",
    "dialCode": "+291",
    "code": "ER",
    "notes": null,
    "numberFormat": {
      max: 7,
      "min": 7
    },
    "prefixes": [
      {
        "number": "7",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Estonia",
    "dialCode": "+372",
    "code": "EE",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 7
    },
    "prefixes": [
      {
        "number": "51",
        "carrier": "Telia Eesti AS",
        "note": "Exceptions apply on number length"
      },
      {
        "number": "53",
        "carrier": "Telia Eesti AS",
        "note": null
      },
      {
        "number": "54",
        "carrier": "Multiple",
        "note": null
      },
      {
        "number": "55",
        "carrier": "Tele2 Eesti AS",
        "note": "Exceptions apply on number length"
      },
      {
        "number": "56",
        "carrier": "Elisa Eesti AS",
        "note": "Exceptions apply on number length"
      },
      {
        "number": "57",
        "carrier": "Multiple",
        "note": null
      },
      {
        "number": "58",
        "carrier": "Telia Eesti AS",
        "note": null
      },
      {
        "number": "59",
        "carrier": "Telia Eesti AS",
        "note": null
      },
      {
        "number": "50",
        "carrier": "Telia Eesti AS",
        "note": null
      },
      {
        "number": "510518",
        "carrier": "Telia Eesti AS",
        "note": null
      },
      {
        "number": "5195",
        "carrier": "Telia Eesti AS",
        "note": null
      },
      {
        "number": "52",
        "carrier": "Telia Eesti AS",
        "note": null
      },
      {
        "number": "550554",
        "carrier": "Tele2 Eesti AS",
        "note": null
      },
      {
        "number": "557558",
        "carrier": "Tele2 Eesti AS",
        "note": null
      },
      {
        "number": "56405644",
        "carrier": "Elisa Eesti AS",
        "note": null
      },
      {
        "number": "56515655",
        "carrier": "Elisa Eesti AS",
        "note": null
      },
      {
        "number": "56585659",
        "carrier": "Elisa Eesti AS",
        "note": null
      }
    ]
  },
  {
    "name": "Ethiopia",
    "dialCode": "+251",
    "code": "ET",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 9
    },
    "prefixes": [
      {
        "number": "9",
        "carrier": "Ethio telecom",
        "note": null
      }
    ]
  },
  {
    "name": "Faroe Islands",
    "dialCode": "+298",
    "code": "FO",
    "notes": null,
    "numberFormat": {
      max: 6,
      "min": 6
    },
    "prefixes": [
      {
        "number": "21",
        "carrier": null,
        "note": null
      },
      {
        "number": "22",
        "carrier": null,
        "note": null
      },
      {
        "number": "23",
        "carrier": null,
        "note": null
      },
      {
        "number": "24",
        "carrier": null,
        "note": null
      },
      {
        "number": "25",
        "carrier": null,
        "note": null
      },
      {
        "number": "26",
        "carrier": null,
        "note": null
      },
      {
        "number": "27",
        "carrier": null,
        "note": null
      },
      {
        "number": "28",
        "carrier": null,
        "note": null
      },
      {
        "number": "29",
        "carrier": null,
        "note": null
      },
      {
        "number": "5x",
        "carrier": null,
        "note": null
      },
      {
        "number": "71",
        "carrier": null,
        "note": null
      },
      {
        "number": "72",
        "carrier": null,
        "note": null
      },
      {
        "number": "73",
        "carrier": null,
        "note": null
      },
      {
        "number": "74",
        "carrier": null,
        "note": null
      },
      {
        "number": "75",
        "carrier": null,
        "note": null
      },
      {
        "number": "76",
        "carrier": null,
        "note": null
      },
      {
        "number": "77",
        "carrier": null,
        "note": null
      },
      {
        "number": "78",
        "carrier": null,
        "note": null
      },
      {
        "number": "79",
        "carrier": null,
        "note": null
      },
      {
        "number": "91",
        "carrier": null,
        "note": null
      },
      {
        "number": "92",
        "carrier": null,
        "note": null
      },
      {
        "number": "93",
        "carrier": null,
        "note": null
      },
      {
        "number": "94",
        "carrier": null,
        "note": null
      },
      {
        "number": "95",
        "carrier": null,
        "note": null
      },
      {
        "number": "96",
        "carrier": null,
        "note": null
      },
      {
        "number": "97",
        "carrier": null,
        "note": null
      },
      {
        "number": "98",
        "carrier": null,
        "note": null
      },
      {
        "number": "99",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Fiji",
    "dialCode": "+679",
    "code": "FJ",
    "notes": null,
    "numberFormat": {
      max: 7,
      "min": 7
    },
    "prefixes": [
      {
        "number": "3",
        "carrier": "Telecom",
        "note": null
      },
      {
        "number": "7",
        "carrier": "Digicel",
        "note": null
      },
      {
        "number": "9",
        "carrier": "Vodafone",
        "note": null
      }
    ]
  },
  {
    "name": "Finland",
    "dialCode": "+358",
    "code": "FI",
    "notes": null,
    "numberFormat": {
      max: 12,
      "min": 5
    },
    "prefixes": [
      {
        "number": "40",
        "carrier": "Telia Finland Oyj",
        "note": null
      },
      {
        "number": "41",
        "carrier": "DNA Oyj",
        "note": null
      },
      {
        "number": "42",
        "carrier": "Telia Finland Oyj",
        "note": null
      },
      {
        "number": "43",
        "carrier": "Cuuma Communications Oy (4320, 4321)\nBenemen Oy (4322)\n\nTop Connect OÜ (4323)\n\nNord Connect UAB (4324)\n\nNettia Oy (4325)\n\nLancelot BV (4326)\n\nSuomen Turvallisuusverkko Oy (435, 437, 439)\n\nDNA Oyj (436, 438)",
        "note": null
      },
      {
        "number": "44",
        "carrier": "DNA Oyj",
        "note": null
      },
      {
        "number": "45",
        "carrier": "Telia Finland Oyj (450, 4541)\nElisa Oyj (451, 452, 453, 456, 458)\n\nMobiWeb Limited (4540)\n\nInteractive Digital Media GmbH (4545)\n\nIPIFY Limited (4546)\n\nSMS Provider Corp. (4547)\n\nVoxbone S.A. (4548)\n\nTwilio Ireland Ltd. (4549)\n\nSuomen Turvallisuusverkko Oy (4550, 4552, 4554)\n\nVäylävirasto (4556)\n\nCompatel Limited (4557)\n\nMI Carrier Services AB (4559)\n\nÅlands Telekommunikation Ab (4570, 4573, 4575)\n\nTismi BV (4571)\n\nTelavox Oy (4572)\n\nDNA Oyj (4573, 4574, 4576, 4577, 4578, 4579)",
        "note": null
      },
      {
        "number": "46",
        "carrier": "Elisa Oyj",
        "note": null
      },
      {
        "number": "47",
        "carrier": "Currently not assigned",
        "note": null
      },
      {
        "number": "48",
        "carrier": "Currently not assigned",
        "note": null
      },
      {
        "number": "49",
        "carrier": "Ukkoverkot Oy (4941)\nTelit Wireless Solutions GmbH (4942)\n\nDNA Oyj (4944)\n\nElisa Oyj (4946)",
        "note": null
      },
      {
        "number": "50",
        "carrier": "Elisa Oyj",
        "note": null
      }
    ]
  },
  {
    "name": "France",
    "dialCode": "+33",
    "code": "FR",
    "notes": "The '0' is used on all domestic calls, including in the same city, but is omitted when dialling from other countries.",
    "numberFormat": {
      max: 9,
      "min": 9
    },
    "prefixes": [
      {
        "number": "6",
        "carrier": null,
        "note": null
      },
      {
        "number": "700",
        "carrier": null,
        "note": null
      },
      {
        "number": "73",
        "carrier": null,
        "note": null
      },
      {
        "number": "74",
        "carrier": null,
        "note": null
      },
      {
        "number": "75",
        "carrier": null,
        "note": null
      },
      {
        "number": "76",
        "carrier": null,
        "note": null
      },
      {
        "number": "77",
        "carrier": null,
        "note": null
      },
      {
        "number": "78",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "French Guiana",
    "dialCode": "+594",
    "code": "GF",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 9
    },
    "prefixes": [
      {
        "number": "694",
        "carrier": null,
        "note": "594694"
      },
      {
        "number": "700",
        "carrier": null,
        "note": "(NSN = 12 means 594 700 xxx xxx xxx)"
      }
    ]
  },
  {
    "name": "French Polynesia",
    "dialCode": "+689",
    "code": "PF",
    "notes": null,
    "numberFormat": {
      max: 6,
      "min": 6
    },
    "prefixes": [
      {
        "number": "87",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Gabon",
    "dialCode": "+241",
    "code": "GA",
    "notes": null,
    "numberFormat": {
      max: 7,
      "min": 6
    },
    "prefixes": [
      {
        "number": "2",
        "carrier": null,
        "note": null
      },
      {
        "number": "3",
        "carrier": null,
        "note": null
      },
      {
        "number": "4",
        "carrier": null,
        "note": null
      },
      {
        "number": "5",
        "carrier": null,
        "note": null
      },
      {
        "number": "6",
        "carrier": null,
        "note": null
      },
      {
        "number": "7",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Gambia",
    "dialCode": "+220",
    "code": "GM",
    "notes": null,
    "numberFormat": {
      max: 7,
      "min": 7
    },
    "prefixes": [
      {
        "number": "7",
        "carrier": null,
        "note": null
      },
      {
        "number": "9",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Georgia",
    "dialCode": "+995",
    "code": "GE",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 9
    },
    "prefixes": [
      {
        "number": "544",
        "carrier": "Aquafon",
        "note": "Operating in Abkhazia, also having 7-940 code"
      },
      {
        "number": "514",
        "carrier": "Silknet Geocell",
        "note": "Prefixes can be of other networks."
      },
      {
        "number": "551",
        "carrier": "MagtiCom Bani",
        "note": null
      },
      {
        "number": "555",
        "carrier": "Silknet Geocell",
        "note": null
      },
      {
        "number": "557",
        "carrier": "Silknet Geocell",
        "note": null
      },
      {
        "number": "558",
        "carrier": "Silknet Geocell",
        "note": null
      },
      {
        "number": "568",
        "carrier": "BeeLine",
        "note": null
      },
      {
        "number": "570",
        "carrier": "Silknet S1",
        "note": null
      },
      {
        "number": "571",
        "carrier": "BeeLine",
        "note": null
      },
      {
        "number": "574",
        "carrier": "BeeLine",
        "note": null
      },
      {
        "number": "577",
        "carrier": "Silknet Geocell",
        "note": null
      },
      {
        "number": "578",
        "carrier": "Silknet S1",
        "note": null
      },
      {
        "number": "579",
        "carrier": "BeeLine",
        "note": null
      },
      {
        "number": "591",
        "carrier": "MagtiCom",
        "note": null
      },
      {
        "number": "592",
        "carrier": "BeeLine",
        "note": null
      },
      {
        "number": "593",
        "carrier": "Silknet Geocell",
        "note": null
      },
      {
        "number": "595",
        "carrier": "MagtiCom",
        "note": null
      },
      {
        "number": "596",
        "carrier": "MagtiCom Bali",
        "note": null
      },
      {
        "number": "597",
        "carrier": "BeeLine",
        "note": null
      },
      {
        "number": "598",
        "carrier": "MagtiCom Bali",
        "note": null
      },
      {
        "number": "599",
        "carrier": "MagtiCom",
        "note": null
      }
    ]
  },
  {
    "name": "Germany",
    "dialCode": "+49",
    "code": "DE",
    "notes": null,
    "numberFormat": {
      max: 13,
      "min": 6
    },
    "prefixes": [
      {
        "number": "151",
        "carrier": "T-Mobile (GSM/UMTS)",
        "note": null
      },
      {
        "number": "152",
        "carrier": "Vodafone D2 (GSM/UMTS)",
        "note": null
      },
      {
        "number": "155",
        "carrier": "E-Plus (GSM/UMTS)",
        "note": null
      },
      {
        "number": "157",
        "carrier": "E-Plus (GSM/UMTS)",
        "note": "157-0 used for MVNO ViStream,157-5 for Ring Mobilfunk"
      },
      {
        "number": "159",
        "carrier": "O2 Germany (GSM/UMTS)",
        "note": null
      },
      {
        "number": "160",
        "carrier": "T-Mobile (GSM/UMTS)",
        "note": "NSN length is 10 digits except 0160–9 with 11 digits"
      },
      {
        "number": "162",
        "carrier": "Vodafone D2 (GSM/UMTS)",
        "note": null
      },
      {
        "number": "163",
        "carrier": "E-Plus (GSM/UMTS)",
        "note": null
      },
      {
        "number": "170",
        "carrier": "T-Mobile (GSM/UMTS)",
        "note": null
      },
      {
        "number": "171",
        "carrier": "T-Mobile (GSM/UMTS)",
        "note": null
      },
      {
        "number": "172",
        "carrier": "Vodafone D2 (GSM/UMTS)",
        "note": null
      },
      {
        "number": "173",
        "carrier": "Vodafone D2 (GSM/UMTS)",
        "note": null
      },
      {
        "number": "174",
        "carrier": "Vodafone D2 (GSM/UMTS)",
        "note": null
      },
      {
        "number": "175",
        "carrier": "T-Mobile (GSM/UMTS)",
        "note": null
      },
      {
        "number": "176",
        "carrier": "O2 Germany (GSM/UMTS)",
        "note": null
      },
      {
        "number": "177",
        "carrier": "E-Plus (GSM/UMTS)",
        "note": null
      },
      {
        "number": "178",
        "carrier": "E-Plus (GSM/UMTS)",
        "note": null
      },
      {
        "number": "179",
        "carrier": "O2 Germany (GSM/UMTS)",
        "note": null
      }
    ]
  },
  {
    "name": "Ghana",
    "dialCode": "+233",
    "code": "GH",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 5
    },
    "prefixes": [
      {
        "number": "20",
        "carrier": "Vodafone",
        "note": null
      },
      {
        "number": "50",
        "carrier": "Vodafone",
        "note": null
      },
      {
        "number": "23",
        "carrier": "Glo Mobile",
        "note": null
      },
      {
        "number": "24",
        "carrier": "MTN",
        "note": null
      },
      {
        "number": "54",
        "carrier": "MTN",
        "note": null
      },
      {
        "number": "55",
        "carrier": "MTN",
        "note": null
      },
      {
        "number": "59",
        "carrier": "MTN",
        "note": null
      },
      {
        "number": "26",
        "carrier": "Airtel (Zain)",
        "note": null
      },
      {
        "number": "56",
        "carrier": "Airtel (Zain)",
        "note": null
      },
      {
        "number": "27",
        "carrier": "Tigo",
        "note": null
      },
      {
        "number": "57",
        "carrier": "Tigo",
        "note": null
      },
      {
        "number": "28",
        "carrier": "Kasapa",
        "note": null
      }
    ]
  },
  {
    "name": "Gibraltar",
    "dialCode": "+350",
    "code": "GI",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 8
    },
    "prefixes": [
      {
        "number": "58",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Greece",
    "dialCode": "+30",
    "code": "GR",
    "notes": "The '0' is used on all domestic calls, including in the same city, but is omitted when dialling from other countries.",
    "numberFormat": {
      max: 10,
      "min": 10
    },
    "prefixes": [
      {
        "number": "2",
        "carrier": "Landline",
        "note": null
      },
      {
        "number": "1",
        "carrier": "Emergency or short number",
        "note": null
      },
      {
        "number": "690",
        "carrier": "WIND",
        "note": null
      },
      {
        "number": "693",
        "carrier": "WIND",
        "note": null
      },
      {
        "number": "694",
        "carrier": "Vodafone",
        "note": null
      },
      {
        "number": "695",
        "carrier": "Vodafone",
        "note": null
      },
      {
        "number": "697",
        "carrier": "Cosmote",
        "note": null
      },
      {
        "number": "698",
        "carrier": "Cosmote",
        "note": null
      },
      {
        "number": "699",
        "carrier": "WIND",
        "note": "The prefix belonged to Q-Telecom until WIND acquired the company in May 2007."
      }
    ]
  },
  {
    "name": "Greenland",
    "dialCode": "+299",
    "code": "GL",
    "notes": null,
    "numberFormat": {
      max: 6,
      "min": 6
    },
    "prefixes": [
      {
        "number": "2",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Grenada",
    "dialCode": "+1473",
    "code": "GD",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 10
    },
    "prefixes": [
      {
        "number": "473 41x",
        "carrier": null,
        "note": "NANP member"
      }
    ]
  },
  {
    "name": "Guadeloupe",
    "dialCode": "+590",
    "code": "GP",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 9
    },
    "prefixes": [
      {
        "number": "690",
        "carrier": null,
        "note": "590 690 xx xx xx (Guadeloupe, Saint-Barthélemy and Saint-Martin share the same prefix)"
      },
      {
        "number": "700",
        "carrier": null,
        "note": "(NSN = 12 means 590 700 xxx xxx xxx)"
      }
    ]
  },
  {
    "name": "Guam",
    "dialCode": "+1671",
    "code": "GU",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 10
    },
    "prefixes": [
      {
        "number": "671",
        "carrier": null,
        "note": "NANP member, no mobile-specific prefix"
      }
    ]
  },
  {
    "name": "Guatemala",
    "dialCode": "+502",
    "code": "GT",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 8
    },
    "prefixes": [
      {
        "number": "231",
        "carrier": "Comcel Mobile",
        "note": null
      },
      {
        "number": "2324",
        "carrier": "Comcel Mobile",
        "note": null
      },
      {
        "number": "2326",
        "carrier": "Comcel Mobile",
        "note": null
      },
      {
        "number": "2327",
        "carrier": "Comcel Mobile",
        "note": null
      },
      {
        "number": "2328",
        "carrier": "Comcel Mobile",
        "note": null
      },
      {
        "number": "2329",
        "carrier": "Comcel Mobile",
        "note": null
      },
      {
        "number": "2428",
        "carrier": "Comcel Mobile",
        "note": null
      },
      {
        "number": "2429",
        "carrier": "Comcel Mobile",
        "note": null
      },
      {
        "number": "30",
        "carrier": "Comcel Mobile",
        "note": null
      },
      {
        "number": "310",
        "carrier": "Comcel Mobile",
        "note": null
      },
      {
        "number": "311",
        "carrier": "Comcel Mobile",
        "note": null
      },
      {
        "number": "31203128",
        "carrier": "Comcel Mobile",
        "note": null
      },
      {
        "number": "44764479",
        "carrier": "Comcel Mobile",
        "note": null
      },
      {
        "number": "448",
        "carrier": "Comcel Mobile",
        "note": null
      },
      {
        "number": "449",
        "carrier": "Comcel Mobile",
        "note": null
      },
      {
        "number": "45",
        "carrier": "Comcel Mobile",
        "note": null
      },
      {
        "number": "46",
        "carrier": "Comcel Mobile",
        "note": null
      },
      {
        "number": "470476",
        "carrier": "Comcel Mobile",
        "note": null
      },
      {
        "number": "47734779",
        "carrier": "Comcel Mobile",
        "note": null
      },
      {
        "number": "478",
        "carrier": "Comcel Mobile",
        "note": null
      },
      {
        "number": "479",
        "carrier": "Comcel Mobile",
        "note": null
      },
      {
        "number": "480",
        "carrier": "Comcel Mobile",
        "note": null
      },
      {
        "number": "481",
        "carrier": "Comcel Mobile",
        "note": null
      },
      {
        "number": "48224829",
        "carrier": "Comcel Mobile",
        "note": null
      },
      {
        "number": "483489",
        "carrier": "Comcel Mobile",
        "note": null
      },
      {
        "number": "49",
        "carrier": "Comcel Mobile",
        "note": null
      },
      {
        "number": "4",
        "carrier": null,
        "note": null
      },
      {
        "number": "5",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Guinea",
    "dialCode": "+224",
    "code": "GN",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 8
    },
    "prefixes": [
      {
        "number": "6",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Guyana",
    "dialCode": "+595",
    "code": "GY",
    "notes": null,
    "numberFormat": {
      max: 7,
      "min": 7
    },
    "prefixes": [
      {
        "number": "6",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Haiti",
    "dialCode": "+509",
    "code": "HT",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 8
    },
    "prefixes": []
  },
  {
    "name": "Honduras",
    "dialCode": "+504",
    "code": "HN",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 8
    },
    "prefixes": [
      {
        "number": "3",
        "carrier": "Claro",
        "note": null
      },
      {
        "number": "7",
        "carrier": "Hondutel",
        "note": null
      },
      {
        "number": "8",
        "carrier": "Digicel",
        "note": null
      },
      {
        "number": "9",
        "carrier": "Tigo",
        "note": null
      }
    ]
  },
  {
    "name": "Hong Kong",
    "dialCode": "+852",
    "code": "HK",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 4
    },
    "prefixes": [
      {
        "number": "460469",
        "carrier": "various operators, including  CSL Mobile, Sun Mobile, 3 HK, PCCW Mobile, SmarTone, CMHK, China Unicom",
        "note": "Operator can be changed while keeping numbers."
      },
      {
        "number": "510579",
        "carrier": "various operators, including  CSL Mobile, Sun Mobile, 3 HK, PCCW Mobile, SmarTone, CMHK, China Unicom",
        "note": "Operator can be changed while keeping numbers."
      },
      {
        "number": "590599",
        "carrier": "various operators, including  CSL Mobile, Sun Mobile, 3 HK, PCCW Mobile, SmarTone, CMHK, China Unicom",
        "note": "Operator can be changed while keeping numbers."
      },
      {
        "number": "601699",
        "carrier": "various operators, including  CSL Mobile, Sun Mobile, 3 HK, PCCW Mobile, SmarTone, CMHK, China Unicom",
        "note": "Operator can be changed while keeping numbers."
      },
      {
        "number": "701709",
        "carrier": "various operators, including  CSL Mobile, Sun Mobile, 3 HK, PCCW Mobile, SmarTone, CMHK, China Unicom",
        "note": "Operator can be changed while keeping numbers."
      },
      {
        "number": "840849",
        "carrier": "various operators, including  CSL Mobile, Sun Mobile, 3 HK, PCCW Mobile, SmarTone, CMHK, China Unicom",
        "note": "Operator can be changed while keeping numbers."
      },
      {
        "number": "901910",
        "carrier": "various operators, including  CSL Mobile, Sun Mobile, 3 HK, PCCW Mobile, SmarTone, CMHK, China Unicom",
        "note": "Operator can be changed while keeping numbers."
      },
      {
        "number": "912989",
        "carrier": "various operators, including  CSL Mobile, Sun Mobile, 3 HK, PCCW Mobile, SmarTone, CMHK, China Unicom",
        "note": "Operator can be changed while keeping numbers."
      }
    ]
  },
  {
    "name": "Hungary",
    "dialCode": "+36",
    "code": "HU",
    "notes": "Subscriber numbers on PSTN and analogue mobile network consist of 8 digits and those on the mobile network consist of 9 digits.",
    "numberFormat": {
      max: 9,
      "min": 8
    },
    "prefixes": [
      {
        "number": "20",
        "carrier": "Yettel (formerly Telenor, Pannon and Pannon GSM)",
        "note": null
      },
      {
        "number": "30",
        "carrier": "Telekom (formerly T-Mobile and Westel 900)",
        "note": "Used by MOL Mobile until 31 December 2021 and Blue Mobile until 1 November 2021.[8]"
      },
      {
        "number": "31",
        "carrier": "reserved / retired",
        "note": "Used by UPC Mobil until 1 October 2019[9] and Tesco Mobile until 16 April 2016."
      },
      {
        "number": "38",
        "carrier": "GSM-R network for MÁV and GYSEV",
        "note": null
      },
      {
        "number": "50",
        "carrier": "reserved / retired",
        "note": "Used by DIGI until 1 June 2023.[10]"
      },
      {
        "number": "60",
        "carrier": "reserved / retired",
        "note": "Used by Westel (which used the 450 MHz NMT standard) with 6-digit telephone numbers until 30 June 2003 when the range was retired and the 60 prefix was replaced with 309 for all customers."
      },
      {
        "number": "70",
        "carrier": "Vodafone",
        "note": null
      }
    ]
  },
  {
    "name": "Iceland",
    "dialCode": "+354",
    "code": "IS",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 7
    },
    "prefixes": [
      {
        "number": "6",
        "carrier": "Three providers are present in Iceland: Siminn, Vodafone and Nova.",
        "note": null
      }
    ]
  },
  {
    "name": "India",
    "dialCode": "+91",
    "code": "IN",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 7
    },
    "prefixes": [
      {
        "number": "6",
        "carrier": "Reliance Jio GSM",
        "note": null
      },
      {
        "number": "7",
        "carrier": "Various GSM and CDMA, including Aircel GSM, Airtel, BSNL GSM & CDMA, Idea, Loop Mobile GSM, MTS CDMA, Reliance GSM & CDMA, S-Tel GSM, Uninor GSM, Videocon GSM, Vodafone GSM.",
        "note": null
      },
      {
        "number": "8",
        "carrier": "Various GSM and CDMA, including Aircel GSM, Airtel, BSNL GSM & CDMA, Idea, Loop Mobile GSM, MTS CDMA, Reliance GSM & CDMA, S-Tel GSM, Uninor GSM, Videocon GSM, Vodafone GSM.",
        "note": null
      },
      {
        "number": "90",
        "carrier": "Various GSM",
        "note": null
      },
      {
        "number": "91",
        "carrier": "Various GSM and CDMA, including MTS CDMA, BSNL GSM & CDMA, Uninor GSM, Loop Mobile GSM, S-Tel GSM etc.",
        "note": null
      },
      {
        "number": "92",
        "carrier": "Tata Indicom CDMA",
        "note": null
      },
      {
        "number": "93",
        "carrier": "Reliance CDMA",
        "note": null
      },
      {
        "number": "94",
        "carrier": "BSNL GSM",
        "note": null
      },
      {
        "number": "95",
        "carrier": "Various GSM, including Airtel, BSNL, Idea, Aircel, Reliance GSM and Vodafone.",
        "note": null
      },
      {
        "number": "96",
        "carrier": "Various GSM and CDMA, including Airtel, Idea, Reliance CDMA & GSM, Vodafone and Aircel.",
        "note": null
      },
      {
        "number": "97",
        "carrier": "Various GSM, including Airtel, Vodafone, Idea, Aircel, Uninor, Reliance GSM and Videocon.",
        "note": null
      },
      {
        "number": "98",
        "carrier": "Various GSM, including Airtel, Vodafone, Idea, Aircel, Uninor, Reliance GSM and Videocon.",
        "note": null
      },
      {
        "number": "99",
        "carrier": "Various GSM, including Airtel, Vodafone, Idea, Aircel, Uninor, Reliance GSM and Videocon.",
        "note": null
      }
    ]
  },
  {
    "name": "Indonesia",
    "dialCode": "+62",
    "code": "ID",
    "notes": "Western Indonesia including Sumatra, Java, Madura and Bali UTC+7; Central Indonesia including Kalimantan (Borneo), Sulawesi (Celebes) and Nusatengarra (Lesser Sunda) UTC+8; Eastern Indonesia including Maluku (Moluccas) and Irianjaya (Irian) UTC+9.",
    "numberFormat": {
      max: 10,
      "min": 5
    },
    "prefixes": [
      {
        "number": "811",
        "carrier": "Telkomsel (KartuHalo)",
        "note": "6 digits"
      },
      {
        "number": "812",
        "carrier": "Telkomsel (simPati)",
        "note": "7-8 digits"
      },
      {
        "number": "813",
        "carrier": "Telkomsel (simPati)",
        "note": "8 digits"
      },
      {
        "number": "814",
        "carrier": "Indosat (IM2 Broadband Internet & Matrix)",
        "note": "8 digits"
      },
      {
        "number": "815",
        "carrier": "Indosat (Mentari & Matrix)",
        "note": "7 digits"
      },
      {
        "number": "816",
        "carrier": "Indosat (Mentari)",
        "note": "6-7 digits"
      },
      {
        "number": "817",
        "carrier": "XL",
        "note": "6-7 digits"
      },
      {
        "number": "818",
        "carrier": "XL",
        "note": "6 digits"
      },
      {
        "number": "819",
        "carrier": "XL",
        "note": "7 digits"
      },
      {
        "number": "821",
        "carrier": "Telkomsel (simPATI)",
        "note": "8 digits"
      },
      {
        "number": "822",
        "carrier": "Telkomsel (simPATI)",
        "note": "8 digits"
      },
      {
        "number": "823",
        "carrier": "Telkomsel (simPATI)",
        "note": "8 digits"
      },
      {
        "number": "831",
        "carrier": "AXIS",
        "note": "8 digits"
      },
      {
        "number": "838",
        "carrier": null,
        "note": "8 digits"
      },
      {
        "number": "851",
        "carrier": "Telkomsel (Kartu As)",
        "note": "8 digits"
      },
      {
        "number": "852",
        "carrier": "Telkomsel (Kartu As)",
        "note": "8 digits"
      },
      {
        "number": "853",
        "carrier": "Telkomsel (Kartu As)",
        "note": "8 digits"
      },
      {
        "number": "855",
        "carrier": "Indosat (im3 Postpaid)",
        "note": "7 digits"
      },
      {
        "number": "856",
        "carrier": "Indosat (im3 Prepaid)",
        "note": "7-8 digits"
      },
      {
        "number": "857",
        "carrier": "Indosat (im3 Prepaid)",
        "note": "7-8 digits"
      },
      {
        "number": "858",
        "carrier": "Indosat (Mentari)",
        "note": "8 digits"
      },
      {
        "number": "859",
        "carrier": "XL",
        "note": "8 digits"
      },
      {
        "number": "878",
        "carrier": "XL",
        "note": "8 digits"
      },
      {
        "number": "895",
        "carrier": "3",
        "note": "7 digits"
      },
      {
        "number": "896",
        "carrier": "3",
        "note": "7 digits"
      },
      {
        "number": "897",
        "carrier": "3",
        "note": "7 digits"
      },
      {
        "number": "898",
        "carrier": "3",
        "note": "7 digits"
      },
      {
        "number": "899",
        "carrier": "3",
        "note": "7 digits"
      }
    ]
  },
  {
    "name": "Iraq",
    "dialCode": "+964",
    "code": "IQ",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 8
    },
    "prefixes": [
      {
        "number": "73",
        "carrier": "Korek Telecom (formerly SanaTel)",
        "note": null
      },
      {
        "number": "74",
        "carrier": "Itisaluna and Kalemat",
        "note": null
      },
      {
        "number": "75",
        "carrier": "Korek Telecom",
        "note": null
      },
      {
        "number": "76",
        "carrier": "Mobitel (Iraq-Kurdistan) and Moutiny",
        "note": null
      },
      {
        "number": "77",
        "carrier": "AsiaCell",
        "note": null
      },
      {
        "number": "78",
        "carrier": "Zain Iraq (formerly MTC Atheer)",
        "note": null
      },
      {
        "number": "79",
        "carrier": "Zain Iraq, (formerly Iraqna)",
        "note": null
      }
    ]
  },
  {
    "name": "Ireland",
    "dialCode": "+353",
    "code": "IE",
    "notes": "When dialling from Ireland to Northern Ireland, the area code used should be '048' instead of '0044 28'.",
    "numberFormat": {
      max: 11,
      "min": 7
    },
    "prefixes": [
      {
        "number": "8",
        "carrier": null,
        "note": null
      },
      {
        "number": "83",
        "carrier": "Three Ireland and BlueFace",
        "note": null
      },
      {
        "number": "85",
        "carrier": "Eir and GoMo",
        "note": "Formerly Meteor (1998–2017)"
      },
      {
        "number": "86",
        "carrier": "Three Ireland",
        "note": "Formerly O2 (Ireland) (2006–15) and Esat Digifone (1997–2006)"
      },
      {
        "number": "87",
        "carrier": "Vodafone Ireland",
        "note": "Formerly Eircell (1998–2001) and Cellular 3 (2000–01)"
      },
      {
        "number": "88",
        "carrier": "Formerly used for the Eircell TACS service (1985–2001)",
        "note": null
      },
      {
        "number": "89",
        "carrier": "Tesco Mobile, Lycamobile, 48, Virgin Mobile (MVNOs)",
        "note": null
      }
    ]
  },
  {
    "name": "Israel",
    "dialCode": "+972",
    "code": "IL",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 8
    },
    "prefixes": [
      {
        "number": "50",
        "carrier": "Pelephone / Walla Mobile / YouPhone",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      },
      {
        "number": "52",
        "carrier": "Cellcom / MVoice",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      },
      {
        "number": "53",
        "carrier": "Hot Mobile",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      },
      {
        "number": "54",
        "carrier": "Partner / 012 Mobile",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      },
      {
        "number": "5522 or 5523",
        "carrier": "Home Cellular",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      },
      {
        "number": "556",
        "carrier": "Rami Levy Hashikma Marketing",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      },
      {
        "number": "5570 or 5571",
        "carrier": "Cellact",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      },
      {
        "number": "558",
        "carrier": "Pelephone / Walla Mobile / YouPhone",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      },
      {
        "number": "559",
        "carrier": "019 Telecom",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      },
      {
        "number": "58",
        "carrier": "Golan Telecom",
        "note": "Users can now switch carriers and keep their cell phone numbers, including prefix"
      }
    ]
  },
  {
    "name": "Jamaica",
    "dialCode": "+1876",
    "code": "JM",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 10
    },
    "prefixes": [
      {
        "number": "876",
        "carrier": null,
        "note": "NANP member, no mobile-specific prefix"
      }
    ]
  },
  {
    "name": "Japan",
    "dialCode": "+81",
    "code": "JP",
    "notes": null,
    "numberFormat": {
      max: 13,
      "min": 5
    },
    "prefixes": []
  },
  {
    "name": "Jordan",
    "dialCode": "+962",
    "code": "JO",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 5
    },
    "prefixes": [
      {
        "number": "77",
        "carrier": "Orange",
        "note": "example 962 77 000 0000 with country code is 12 digits"
      },
      {
        "number": "79",
        "carrier": "Zain Jordan",
        "note": "example 962 79 000 0000 with country code is 12 digits"
      },
      {
        "number": "78",
        "carrier": "Umniah",
        "note": "example 962 78 000 0000 with country code is 12 digits"
      }
    ]
  },
  {
    "name": "Kazakhstan",
    "dialCode": "+77",
    "code": "KZ",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 10
    },
    "prefixes": [
      {
        "number": "700",
        "carrier": "Altel",
        "note": null
      },
      {
        "number": "708",
        "carrier": "Altel",
        "note": null
      },
      {
        "number": "701",
        "carrier": "Kcell GSM",
        "note": null
      },
      {
        "number": "702",
        "carrier": "Kcell GSM",
        "note": null
      },
      {
        "number": "775",
        "carrier": "Kcell GSM",
        "note": null
      },
      {
        "number": "778",
        "carrier": "Kcell GSM",
        "note": null
      },
      {
        "number": "705",
        "carrier": "Beeline GSM",
        "note": null
      },
      {
        "number": "771",
        "carrier": "Beeline GSM",
        "note": null
      },
      {
        "number": "776",
        "carrier": "Beeline GSM",
        "note": null
      },
      {
        "number": "777",
        "carrier": "Beeline GSM",
        "note": null
      },
      {
        "number": "707",
        "carrier": "Tele2 GSM",
        "note": null
      },
      {
        "number": "747",
        "carrier": "Tele2 GSM",
        "note": null
      },
      {
        "number": "706",
        "carrier": "IZI",
        "note": null
      }
    ]
  },
  {
    "name": "Kenya",
    "dialCode": "+254",
    "code": "KE",
    "notes": "When dialling between Kenya, Tanzania and Uganda the national (significant) number must be prefixed by 005 for Kenya, by 006 for Uganda and by 007 for Tanzania",
    "numberFormat": {
      max: 10,
      "min": 6
    },
    "prefixes": [
      {
        "number": "10",
        "carrier": "Airtel",
        "note": null
      },
      {
        "number": "11",
        "carrier": "Safaricom",
        "note": null
      },
      {
        "number": "70",
        "carrier": "Safaricom",
        "note": null
      },
      {
        "number": "71",
        "carrier": "Safaricom",
        "note": null
      },
      {
        "number": "72",
        "carrier": "Safaricom",
        "note": null
      },
      {
        "number": "73",
        "carrier": "Airtel",
        "note": null
      },
      {
        "number": "74",
        "carrier": "Jamii",
        "note": null
      },
      {
        "number": "75",
        "carrier": "Yu",
        "note": null
      },
      {
        "number": "763",
        "carrier": "Equitel",
        "note": null
      },
      {
        "number": "77",
        "carrier": "Orange",
        "note": null
      },
      {
        "number": "78",
        "carrier": "Airtel",
        "note": null
      }
    ]
  },
  {
    "name": "Kiribati",
    "dialCode": "+686",
    "code": "KI",
    "notes": null,
    "numberFormat": {
      max: 5,
      "min": 5
    },
    "prefixes": [
      {
        "number": "63",
        "carrier": null,
        "note": null
      },
      {
        "number": "7",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Kuwait",
    "dialCode": "+965",
    "code": "KW",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 7
    },
    "prefixes": [
      {
        "number": "5",
        "carrier": "Viva",
        "note": null
      },
      {
        "number": "6",
        "carrier": "Ooredoo Kuwait",
        "note": null
      },
      {
        "number": "9",
        "carrier": "Zain",
        "note": null
      }
    ]
  },
  {
    "name": "Kyrgyzstan",
    "dialCode": "+996",
    "code": "KG",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 9
    },
    "prefixes": [
      {
        "number": "5",
        "carrier": null,
        "note": null
      },
      {
        "number": "9",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Laos",
    "dialCode": "+856",
    "code": "LA",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 8
    },
    "prefixes": [
      {
        "number": "20",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Latvia",
    "dialCode": "+371",
    "code": "LV",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 7
    },
    "prefixes": [
      {
        "number": "2",
        "carrier": null,
        "note": "There are 4 mobile operators (LMT, Tele2, Bite, Triatel)\n\nAll mobile phone numbers start with \"2\" and each of them has 8 digits (without country code),.\n\nFor example: 371 2 63 12345"
      }
    ]
  },
  {
    "name": "Lebanon",
    "dialCode": "+961",
    "code": "LB",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 7
    },
    "prefixes": [
      {
        "number": "03",
        "carrier": "(03-Abcdef) where A is 1/2/3/4/5 for Alfa and 0/6/7/8/9 for Touch",
        "note": null
      },
      {
        "number": "70",
        "carrier": "(70-Abcdef) where A is 1/2/3/4/5 for Alfa and 0/6/7/8/9 for Touch",
        "note": null
      },
      {
        "number": "71",
        "carrier": "(71-Abcdef) where A is 1/2/3/4/5 for Touch and 0/6/7/8/9 for Alfa",
        "note": null
      },
      {
        "number": "76",
        "carrier": "(76-Abcdef) where A is 1/2/3/4/5 for Alfa and 0/6/7/8/9 for Touch, until 01–2011, only 76-6 & 76-7 are available",
        "note": null
      }
    ]
  },
  {
    "name": "Lesotho",
    "dialCode": "+266",
    "code": "LS",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 8
    },
    "prefixes": [
      {
        "number": "58",
        "carrier": null,
        "note": null
      },
      {
        "number": "6",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Liberia",
    "dialCode": "+231",
    "code": "LR",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 7
    },
    "prefixes": [
      {
        "number": "46",
        "carrier": null,
        "note": null
      },
      {
        "number": "47",
        "carrier": null,
        "note": null
      },
      {
        "number": "5",
        "carrier": null,
        "note": null
      },
      {
        "number": "64",
        "carrier": null,
        "note": null
      },
      {
        "number": "65",
        "carrier": null,
        "note": null
      },
      {
        "number": "7",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Liechtenstein",
    "dialCode": "+423",
    "code": "LI",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 7
    },
    "prefixes": [
      {
        "number": "7",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Lithuania",
    "dialCode": "+370",
    "code": "LT",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 8
    },
    "prefixes": [
      {
        "number": "6",
        "carrier": "Bitė Lietuva, Tele2, Telia (previously Omnitel), Eurocom",
        "note": "370 6xx xx xxxUsers can switch carriers while keeping number and prefix (so prefixes are not tightly coupled to a specific carrier)."
      }
    ]
  },
  {
    "name": "Luxembourg",
    "dialCode": "+352",
    "code": "LU",
    "notes": null,
    "numberFormat": {
      max: 11,
      "min": 4
    },
    "prefixes": [
      {
        "number": "621",
        "carrier": "LuxGSM",
        "note": null
      },
      {
        "number": "628",
        "carrier": "LuxGSM",
        "note": null
      },
      {
        "number": "661",
        "carrier": "Orange",
        "note": null
      },
      {
        "number": "668",
        "carrier": "Orange",
        "note": null
      },
      {
        "number": "691",
        "carrier": "Tango Mobile",
        "note": null
      },
      {
        "number": "698",
        "carrier": "Tango Mobile",
        "note": null
      }
    ]
  },
  {
    "name": "Madagascar",
    "dialCode": "+261",
    "code": "MG",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 9
    },
    "prefixes": [
      {
        "number": "3",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Malawi",
    "dialCode": "+265",
    "code": "MW",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 7
    },
    "prefixes": [
      {
        "number": "8",
        "carrier": "TNM",
        "note": null
      },
      {
        "number": "9",
        "carrier": "Celtel",
        "note": null
      }
    ]
  },
  {
    "name": "Malaysia",
    "dialCode": "+60",
    "code": "MY",
    "notes": "When dialling from Singapore to Malaysia, the area code and subscriber number must be prefixed by '020' instead of '00160'. When dialling from Malaysia to Singapore, the subscriber number must be prefixed by '02' instead of '0065'.",
    "numberFormat": {
      max: 9,
      "min": 7
    },
    "prefixes": [
      {
        "number": "10",
        "carrier": "DiGi",
        "note": null
      },
      {
        "number": "11",
        "carrier": "Maxis",
        "note": null
      },
      {
        "number": "12",
        "carrier": "Maxis",
        "note": null
      },
      {
        "number": "13",
        "carrier": "Celcom",
        "note": null
      },
      {
        "number": "14",
        "carrier": "DiGi",
        "note": null
      },
      {
        "number": "16",
        "carrier": "DiGi",
        "note": null
      },
      {
        "number": "17",
        "carrier": "Maxis",
        "note": null
      },
      {
        "number": "18",
        "carrier": "U Mobile",
        "note": null
      },
      {
        "number": "19",
        "carrier": "Celcom",
        "note": null
      }
    ]
  },
  {
    "name": "Maldives",
    "dialCode": "+960",
    "code": "MV",
    "notes": null,
    "numberFormat": {
      max: 7,
      "min": 7
    },
    "prefixes": [
      {
        "number": "7",
        "carrier": "Dhiraagu",
        "note": null
      },
      {
        "number": "9",
        "carrier": "Ooredoo",
        "note": null
      }
    ]
  },
  {
    "name": "Mali",
    "dialCode": "+223",
    "code": "ML",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 8
    },
    "prefixes": [
      {
        "number": "3",
        "carrier": null,
        "note": null
      },
      {
        "number": "4",
        "carrier": null,
        "note": null
      },
      {
        "number": "5",
        "carrier": null,
        "note": null
      },
      {
        "number": "6",
        "carrier": "Malitel",
        "note": null
      },
      {
        "number": "7",
        "carrier": "Orange Mali",
        "note": null
      }
    ]
  },
  {
    "name": "Malta",
    "dialCode": "+356",
    "code": "MT",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 8
    },
    "prefixes": [
      {
        "number": "77",
        "carrier": "Melita Mobile Ltd",
        "note": null
      },
      {
        "number": "79",
        "carrier": "Go Mobile Ltd & MTV Mobile",
        "note": null
      },
      {
        "number": "98",
        "carrier": "Red Touch Phone",
        "note": null
      },
      {
        "number": "99",
        "carrier": "Epic Malta",
        "note": null
      }
    ]
  },
  {
    "name": "Marshall Islands",
    "dialCode": "+692",
    "code": "MH",
    "notes": null,
    "numberFormat": {
      max: 7,
      "min": 7
    },
    "prefixes": [
      {
        "number": "4",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Martinique",
    "dialCode": "+596",
    "code": "MQ",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 9
    },
    "prefixes": [
      {
        "number": "696",
        "carrier": null,
        "note": "596696"
      },
      {
        "number": "700",
        "carrier": null,
        "note": "(NSN = 12 means 596 700 xxx xxx xxx)"
      }
    ]
  },
  {
    "name": "Mauritania",
    "dialCode": "+222",
    "code": "MR",
    "notes": null,
    "numberFormat": {
      max: 7,
      "min": 7
    },
    "prefixes": [
      {
        "number": "6",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Mauritius",
    "dialCode": "+230",
    "code": "MU",
    "notes": "Carrier pre-selection has been introduced in Mauritius since 1 January 2005. The international prefix “00” may be used only by those subscribers who have pre-selected an International Long Distance (ILD) carrier. For subscribers who have not pre-selected any carrier, their international calls made using the prefix “00” are not allowed through.All subscribers may however select the ILD carrier of their choice on a Call-by-Call basis by using the carrier prefix assigned to the selected carrier, by the ICTA (ILD Carrier Prefix: 020, 022, 030, 033, 040, 050, 060, 070).",
    "numberFormat": {
      max: 7,
      "min": 7
    },
    "prefixes": [
      {
        "number": "57",
        "carrier": null,
        "note": null
      },
      {
        "number": "58",
        "carrier": null,
        "note": null
      },
      {
        "number": "59",
        "carrier": null,
        "note": null
      },
      {
        "number": "54",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Mexico",
    "dialCode": "+52",
    "code": "MX",
    "notes": "Baja California Norte UTC-8/DST-7; Baja California Sur, Chihuahua, Nayarit UTC-7/DST-6.",
    "numberFormat": {
      max: 10,
      "min": 10
    },
    "prefixes": [
      {
        "number": "52",
        "carrier": "Telcel, Movistar, IUSACell, Nextel, UNEFON, Virgin Mobile, Tuenti",
        "note": "52 then two digits for code area and eight for mobile line ID. Example 52 00 12345678"
      }
    ]
  },
  {
    "name": "Moldova",
    "dialCode": "+373",
    "code": "MD",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 8
    },
    "prefixes": [
      {
        "number": "60",
        "carrier": "Orange",
        "note": null
      },
      {
        "number": "65",
        "carrier": "Eventis",
        "note": null
      },
      {
        "number": "67",
        "carrier": "Unité",
        "note": null
      },
      {
        "number": "68",
        "carrier": "Orange",
        "note": null
      },
      {
        "number": "69",
        "carrier": "Orange",
        "note": null
      },
      {
        "number": "78",
        "carrier": "Moldcell",
        "note": null
      },
      {
        "number": "79",
        "carrier": "Moldcell",
        "note": null
      }
    ]
  },
  {
    "name": "Monaco",
    "dialCode": "+377",
    "code": "MC",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 5
    },
    "prefixes": [
      {
        "number": "4",
        "carrier": null,
        "note": null
      },
      {
        "number": "6",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Mongolia",
    "dialCode": "+976",
    "code": "MN",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 7
    },
    "prefixes": [
      {
        "number": "70",
        "carrier": "Mongolian Telecom Company",
        "note": "The first telecom company of Mongolia"
      },
      {
        "number": "88",
        "carrier": "Unitel Corporation",
        "note": null
      },
      {
        "number": "89",
        "carrier": "Unitel Corporation",
        "note": null
      },
      {
        "number": "91",
        "carrier": "Skytel",
        "note": "The second largest mobile network coverage in Mongolia"
      },
      {
        "number": "93",
        "carrier": "G-Mobile",
        "note": "The newest mobile network of Mongolia"
      },
      {
        "number": "94",
        "carrier": "Mobicom Corporation",
        "note": "The first Mongolian cellphone operator"
      },
      {
        "number": "95",
        "carrier": "Mobicom Corporation",
        "note": "The first Mongolian cellphone operator"
      },
      {
        "number": "96",
        "carrier": "Skytel",
        "note": "The second largest mobile network coverage in Mongolia"
      },
      {
        "number": "98",
        "carrier": "G-Mobile",
        "note": "The newest mobile network of Mongolia"
      },
      {
        "number": "99",
        "carrier": "Mobicom Corporation",
        "note": "The first Mongolian cellphone operator"
      }
    ]
  },
  {
    "name": "Montenegro",
    "dialCode": "+382",
    "code": "ME",
    "notes": null,
    "numberFormat": {
      max: 12,
      "min": 4
    },
    "prefixes": [
      {
        "number": "60",
        "carrier": "Revolucija, VMNO under MTEL CG",
        "note": null
      },
      {
        "number": "63",
        "carrier": "Telenor Montenegro",
        "note": null
      },
      {
        "number": "66",
        "carrier": "Volim, VMNO under T-Mobile",
        "note": null
      },
      {
        "number": "67",
        "carrier": "T-Mobile",
        "note": null
      },
      {
        "number": "68",
        "carrier": "MTEL CG",
        "note": null
      },
      {
        "number": "69",
        "carrier": "Telenor Montenegro",
        "note": "Telenor Mobile Communications AS"
      }
    ]
  },
  {
    "name": "Montserrat",
    "dialCode": "+1664",
    "code": "MS",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 10
    },
    "prefixes": [
      {
        "number": "664",
        "carrier": null,
        "note": "NANP member, no mobile-specific prefix"
      }
    ]
  },
  {
    "name": "Morocco",
    "dialCode": "+212",
    "code": "MA",
    "notes": "The '0' is used on all domestic calls, including in the same city, but is omitted when dialling from other countries.",
    "numberFormat": {
      max: 9,
      "min": 9
    },
    "prefixes": [
      {
        "number": "6",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Mozambique",
    "dialCode": "+258",
    "code": "MZ",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 8
    },
    "prefixes": [
      {
        "number": "82\n83\n\n84\n\n85\n\n86\n\n87",
        "carrier": "Tmcel\n\nTmcel\n\nVodacom\n\nVodacom\n\nMovitel\n\nMovitel",
        "note": null
      }
    ]
  },
  {
    "name": "Myanmar",
    "dialCode": "+95",
    "code": "MM",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 7
    },
    "prefixes": [
      {
        "number": "92",
        "carrier": "MPT",
        "note": null
      },
      {
        "number": "925",
        "carrier": "MPT",
        "note": null
      },
      {
        "number": "926",
        "carrier": "MPT",
        "note": null
      },
      {
        "number": "943",
        "carrier": "MPT",
        "note": null
      },
      {
        "number": "94",
        "carrier": "MPT",
        "note": null
      },
      {
        "number": "944",
        "carrier": "MPT",
        "note": null
      },
      {
        "number": "95",
        "carrier": "MPT",
        "note": null
      },
      {
        "number": "96",
        "carrier": "MPT",
        "note": null
      },
      {
        "number": "973",
        "carrier": "MPT",
        "note": null
      },
      {
        "number": "991",
        "carrier": "MPT",
        "note": null
      },
      {
        "number": "93",
        "carrier": "MEC",
        "note": null
      },
      {
        "number": "996",
        "carrier": "Ooredoo Myanmar",
        "note": null
      },
      {
        "number": "997",
        "carrier": "Ooredoo Myanmar",
        "note": null
      },
      {
        "number": "977",
        "carrier": "Telenor Myanmar",
        "note": null
      },
      {
        "number": "978",
        "carrier": "Telenor Myanmar",
        "note": null
      },
      {
        "number": "979",
        "carrier": "Telenor Myanmar",
        "note": null
      }
    ]
  },
  {
    "name": "Namibia",
    "dialCode": "+264",
    "code": "NA",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 6
    },
    "prefixes": [
      {
        "number": "60",
        "carrier": "Switch",
        "note": "National telecommunications operator wholly owned by the Government of the Republic of Namibia"
      },
      {
        "number": "81",
        "carrier": "MTC",
        "note": null
      },
      {
        "number": "85",
        "carrier": "Leo",
        "note": null
      }
    ]
  },
  {
    "name": "Nauru",
    "dialCode": "+674",
    "code": "NR",
    "notes": null,
    "numberFormat": {
      max: 7,
      "min": 4
    },
    "prefixes": [
      {
        "number": "555",
        "carrier": null,
        "note": null
      },
      {
        "number": "556",
        "carrier": null,
        "note": null
      },
      {
        "number": "557",
        "carrier": null,
        "note": null
      },
      {
        "number": "558",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Nepal",
    "dialCode": "+977",
    "code": "NP",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 8
    },
    "prefixes": [
      {
        "number": "98",
        "carrier": "Nepal Telecom, Ncell",
        "note": "13 digits including country code ( 977 )"
      }
    ]
  },
  {
    "name": "Netherlands",
    "dialCode": "+31",
    "code": "NL",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 9
    },
    "prefixes": [
      {
        "number": "6",
        "carrier": null,
        "note": "First of the eight digits following the 6 is not 6, nor 7 (67 is reserved for data services and dial up internet), nor 9 (not allocated)."
      }
    ]
  },
  {
    "name": "New Caledonia",
    "dialCode": "+687",
    "code": "NC",
    "notes": null,
    "numberFormat": {
      max: 6,
      "min": 6
    },
    "prefixes": [
      {
        "number": "7",
        "carrier": null,
        "note": null
      },
      {
        "number": "8",
        "carrier": null,
        "note": null
      },
      {
        "number": "9",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "New Zealand",
    "dialCode": "+64",
    "code": "NZ",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 3
    },
    "prefixes": [
      {
        "number": "20",
        "carrier": "Orcon",
        "note": null
      },
      {
        "number": "21",
        "carrier": "Vodafone",
        "note": "6 to 8 digits"
      },
      {
        "number": "22",
        "carrier": "2degrees",
        "note": "7 digits"
      },
      {
        "number": "24",
        "carrier": "Unused",
        "note": "Protected by Management Committee on 30 January 2009 to preserve the potential code expansion option."
      },
      {
        "number": "25",
        "carrier": "Unused",
        "note": "6-7 digits - Was used by Telecom New Zealand (now called Spark) until it was shut down on 31 March 2007. All numbers have now migrated to 027 (7-digit) and 0274 (6-digit)."
      },
      {
        "number": "27",
        "carrier": "Spark New Zealand",
        "note": "7 digits"
      },
      {
        "number": "280",
        "carrier": "Compass Communications",
        "note": null
      },
      {
        "number": "28",
        "carrier": "Mainly CallPlus",
        "note": null
      },
      {
        "number": "283",
        "carrier": "Teletraders MVNO",
        "note": null
      },
      {
        "number": "28",
        "carrier": "M2 MVNO",
        "note": null
      },
      {
        "number": "29",
        "carrier": "TelstraClear",
        "note": "Acquired by Vodafone."
      }
    ]
  },
  {
    "name": "Nicaragua",
    "dialCode": "+505",
    "code": "NI",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 8
    },
    "prefixes": [
      {
        "number": "8",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Niger",
    "dialCode": "+227",
    "code": "NE",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 8
    },
    "prefixes": [
      {
        "number": "9",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Nigeria",
    "dialCode": "+234",
    "code": "NG",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 7
    },
    "prefixes": [
      {
        "number": "804",
        "carrier": "ntel",
        "note": null
      },
      {
        "number": "805",
        "carrier": "glo",
        "note": null
      },
      {
        "number": "803",
        "carrier": "mtn",
        "note": null
      },
      {
        "number": "802",
        "carrier": "airtel",
        "note": null
      },
      {
        "number": "809",
        "carrier": "etisalat",
        "note": null
      }
    ]
  },
  {
    "name": "Niue",
    "dialCode": "+683",
    "code": "NU",
    "notes": null,
    "numberFormat": {
      max: 4,
      "min": 4
    },
    "prefixes": [
      {
        "number": "1",
        "carrier": null,
        "note": null
      },
      {
        "number": "3",
        "carrier": null,
        "note": null
      },
      {
        "number": "4",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Norway",
    "dialCode": "+47",
    "code": "NO",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 5
    },
    "prefixes": [
      {
        "number": "4",
        "carrier": null,
        "note": "47 4x xx xx xx"
      },
      {
        "number": "59",
        "carrier": null,
        "note": "47 59 xx xx xx Machine-to-machine communication, also work with SMS and calls."
      },
      {
        "number": "9",
        "carrier": null,
        "note": "47 9x xx xx xx"
      }
    ]
  },
  {
    "name": "Oman",
    "dialCode": "+968",
    "code": "OM",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 7
    },
    "prefixes": [
      {
        "number": "91",
        "carrier": null,
        "note": "Paging, now retired"
      },
      {
        "number": "91",
        "carrier": "Oman Mobile",
        "note": null
      },
      {
        "number": "92",
        "carrier": "Oman Mobile",
        "note": null
      },
      {
        "number": "93",
        "carrier": "Nawras",
        "note": null
      },
      {
        "number": "94",
        "carrier": "Nawras",
        "note": null
      },
      {
        "number": "95",
        "carrier": "Nawras",
        "note": null
      },
      {
        "number": "96",
        "carrier": "Nawras",
        "note": null
      },
      {
        "number": "97",
        "carrier": "Nawras",
        "note": null
      },
      {
        "number": "98",
        "carrier": "Friendy",
        "note": null
      },
      {
        "number": "99",
        "carrier": "Oman Mobile",
        "note": null
      }
    ]
  },
  {
    "name": "Pakistan",
    "dialCode": "+92",
    "code": "PK",
    "notes": null,
    "numberFormat": {
      max: 11,
      "min": 8
    },
    "prefixes": [
      {
        "number": "30",
        "carrier": "Mobilink",
        "note": "92 30X YYYZZZZ"
      },
      {
        "number": "31",
        "carrier": "Zong",
        "note": "92 31X YYYZZZZ (formerly Paktel)"
      },
      {
        "number": "32",
        "carrier": "Warid Pakistan",
        "note": "92 32X YYYZZZZ"
      },
      {
        "number": "33",
        "carrier": "Ufone",
        "note": "92 33X YYYZZZZ"
      },
      {
        "number": "34",
        "carrier": "Telenor",
        "note": "92 34X YYYZZZZ"
      },
      {
        "number": "355",
        "carrier": "SCOM",
        "note": "92 355 YYYZZZZ"
      }
    ]
  },
  {
    "name": "Palau",
    "dialCode": "+680",
    "code": "PW",
    "notes": null,
    "numberFormat": {
      max: 7,
      "min": 7
    },
    "prefixes": []
  },
  {
    "name": "Panama",
    "dialCode": "+507",
    "code": "PA",
    "notes": "Seven digits for the fixed network and eight digits for the mobile network.",
    "numberFormat": {
      max: 8,
      "min": 7
    },
    "prefixes": [
      {
        "number": "6",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Papua New Guinea",
    "dialCode": "+675",
    "code": "PG",
    "notes": null,
    "numberFormat": {
      max: 11,
      "min": 4
    },
    "prefixes": [
      {
        "number": "7",
        "carrier": null,
        "note": null
      },
      {
        "number": "8",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Paraguay",
    "dialCode": "+595",
    "code": "PY",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 5
    },
    "prefixes": [
      {
        "number": "961",
        "carrier": "VOX",
        "note": null
      },
      {
        "number": "963",
        "carrier": "VOX",
        "note": null
      },
      {
        "number": "971",
        "carrier": "Personal",
        "note": null
      },
      {
        "number": "972",
        "carrier": "Personal",
        "note": null
      },
      {
        "number": "973",
        "carrier": "Personal",
        "note": null
      },
      {
        "number": "975",
        "carrier": "Personal",
        "note": null
      },
      {
        "number": "981",
        "carrier": "Tigo",
        "note": "First cellular operator in this country since 1991"
      },
      {
        "number": "982",
        "carrier": "Tigo",
        "note": "First cellular operator in this country since 1991"
      },
      {
        "number": "983",
        "carrier": "Tigo",
        "note": "First cellular operator in this country since 1991"
      },
      {
        "number": "984",
        "carrier": "Tigo",
        "note": "First cellular operator in this country since 1991"
      },
      {
        "number": "985",
        "carrier": "Tigo",
        "note": "First cellular operator in this country since 1991"
      },
      {
        "number": "991",
        "carrier": "Claro",
        "note": null
      },
      {
        "number": "992",
        "carrier": "Claro",
        "note": null
      },
      {
        "number": "993",
        "carrier": "Claro",
        "note": null
      },
      {
        "number": "995",
        "carrier": "Claro",
        "note": null
      }
    ]
  },
  {
    "name": "Peru",
    "dialCode": "+51",
    "code": "PE",
    "notes": null,
    "numberFormat": {
      max: 11,
      "min": 8
    },
    "prefixes": [
      {
        "number": "9",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Philippines",
    "dialCode": "+63",
    "code": "PH",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 8
    },
    "prefixes": [
      {
        "number": "973",
        "carrier": "Express Telecom",
        "note": null
      },
      {
        "number": "974",
        "carrier": "Express Telecom",
        "note": null
      },
      {
        "number": "905",
        "carrier": "Globe Telecom, Touch Mobile",
        "note": null
      },
      {
        "number": "906",
        "carrier": "Globe Telecom, Touch Mobile",
        "note": null
      },
      {
        "number": "977",
        "carrier": "Globe Telecom, Touch Mobile",
        "note": null
      },
      {
        "number": "915",
        "carrier": "Globe Telecom, Touch Mobile",
        "note": null
      },
      {
        "number": "916",
        "carrier": "Globe Telecom, Touch Mobile",
        "note": null
      },
      {
        "number": "926",
        "carrier": "Globe Telecom, Touch Mobile",
        "note": null
      },
      {
        "number": "927",
        "carrier": "Globe Telecom, Touch Mobile",
        "note": null
      },
      {
        "number": "935",
        "carrier": "Globe Telecom, Touch Mobile",
        "note": null
      },
      {
        "number": "936",
        "carrier": "Globe Telecom, Touch Mobile",
        "note": null
      },
      {
        "number": "937",
        "carrier": "Globe Telecom, Touch Mobile",
        "note": null
      },
      {
        "number": "996",
        "carrier": "Globe Telecom, Touch Mobile",
        "note": null
      },
      {
        "number": "997",
        "carrier": null,
        "note": null
      },
      {
        "number": "917",
        "carrier": "Globe Telecom",
        "note": null
      },
      {
        "number": "979",
        "carrier": "Next Mobile",
        "note": null
      },
      {
        "number": "920",
        "carrier": "Smart Communications, Talk 'N Text, Addict Mobile",
        "note": null
      },
      {
        "number": "930",
        "carrier": "Smart Communications, Talk 'N Text, Red Mobile",
        "note": null
      },
      {
        "number": "938",
        "carrier": "Smart Communications, Talk 'N Text, Red Mobile",
        "note": null
      },
      {
        "number": "939",
        "carrier": "Smart Communications, Talk 'N Text, Red Mobile",
        "note": null
      },
      {
        "number": "907",
        "carrier": "Smart Communications, Talk 'N Text",
        "note": null
      },
      {
        "number": "908",
        "carrier": "Smart Communications, Talk 'N Text",
        "note": null
      },
      {
        "number": "909",
        "carrier": "Smart Communications, Talk 'N Text",
        "note": null
      },
      {
        "number": "910",
        "carrier": "Smart Communications, Talk 'N Text",
        "note": null
      },
      {
        "number": "912",
        "carrier": "Smart Communications, Talk 'N Text",
        "note": null
      },
      {
        "number": "919",
        "carrier": "Smart Communications, Talk 'N Text",
        "note": null
      },
      {
        "number": "921",
        "carrier": "Smart Communications, Talk 'N Text",
        "note": null
      },
      {
        "number": "928",
        "carrier": "Smart Communications, Talk 'N Text",
        "note": null
      },
      {
        "number": "929",
        "carrier": "Smart Communications, Talk 'N Text",
        "note": null
      },
      {
        "number": "947",
        "carrier": "Smart Communications, Talk 'N Text",
        "note": null
      },
      {
        "number": "948",
        "carrier": "Smart Communications, Talk 'N Text",
        "note": null
      },
      {
        "number": "949",
        "carrier": "Smart Communications, Talk 'N Text",
        "note": null
      },
      {
        "number": "989",
        "carrier": null,
        "note": null
      },
      {
        "number": "918",
        "carrier": "Smart Communications",
        "note": null
      },
      {
        "number": "999",
        "carrier": "Smart Communications, Red Mobile",
        "note": null
      },
      {
        "number": "922",
        "carrier": "Sun Cellular",
        "note": null
      },
      {
        "number": "923",
        "carrier": "Sun Cellular",
        "note": null
      },
      {
        "number": "932",
        "carrier": "Sun Cellular",
        "note": null
      },
      {
        "number": "933",
        "carrier": "Sun Cellular",
        "note": null
      },
      {
        "number": "942",
        "carrier": "Sun Cellular",
        "note": null
      },
      {
        "number": "943",
        "carrier": "Sun Cellular",
        "note": null
      }
    ]
  },
  {
    "name": "Poland",
    "dialCode": "+48",
    "code": "PL",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 6
    },
    "prefixes": [
      {
        "number": "50",
        "carrier": null,
        "note": null
      },
      {
        "number": "45",
        "carrier": null,
        "note": null
      },
      {
        "number": "51",
        "carrier": null,
        "note": null
      },
      {
        "number": "53",
        "carrier": null,
        "note": null
      },
      {
        "number": "57",
        "carrier": null,
        "note": null
      },
      {
        "number": "60",
        "carrier": null,
        "note": null
      },
      {
        "number": "66",
        "carrier": null,
        "note": null
      },
      {
        "number": "69",
        "carrier": null,
        "note": null
      },
      {
        "number": "72",
        "carrier": null,
        "note": null
      },
      {
        "number": "73",
        "carrier": null,
        "note": null
      },
      {
        "number": "78",
        "carrier": null,
        "note": null
      },
      {
        "number": "79",
        "carrier": null,
        "note": null
      },
      {
        "number": "88",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Portugal",
    "dialCode": "+351",
    "code": "PT",
    "notes": null,
    "numberFormat": {
      max: 11,
      "min": 9
    },
    "prefixes": [
      {
        "number": "91",
        "carrier": "Vodafone",
        "note": null
      },
      {
        "number": "921",
        "carrier": "Vodafone",
        "note": null
      },
      {
        "number": "922",
        "carrier": "Phone-Ix (discontinued)",
        "note": null
      },
      {
        "number": "924",
        "carrier": "MEO",
        "note": null
      },
      {
        "number": "925",
        "carrier": "MEO",
        "note": null
      },
      {
        "number": "926",
        "carrier": "MEO",
        "note": null
      },
      {
        "number": "927",
        "carrier": "MEO",
        "note": null
      },
      {
        "number": "9290",
        "carrier": "NOS",
        "note": null
      },
      {
        "number": "9291",
        "carrier": "NOS",
        "note": null
      },
      {
        "number": "9292",
        "carrier": "NOS",
        "note": null
      },
      {
        "number": "9293",
        "carrier": "NOS",
        "note": null
      },
      {
        "number": "9294",
        "carrier": "NOS",
        "note": null
      },
      {
        "number": "93",
        "carrier": "NOS",
        "note": null
      },
      {
        "number": "96",
        "carrier": "MEO",
        "note": null
      }
    ]
  },
  {
    "name": "Puerto Rico",
    "dialCode": "+1939",
    "code": "PR",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 10
    },
    "prefixes": [
      {
        "number": "787",
        "carrier": null,
        "note": "Mobile phones use geographic numbers that cannot be recognized as cell numbers."
      },
      {
        "number": "939",
        "carrier": null,
        "note": "Mobile phones use geographic numbers that cannot be recognized as cell numbers."
      }
    ]
  },
  {
    "name": "Qatar",
    "dialCode": "+974",
    "code": "QA",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 3
    },
    "prefixes": [
      {
        "number": "33",
        "carrier": "Qtel",
        "note": "Format: 974 33XX-XXXX or 33XX-XXXX"
      },
      {
        "number": "55",
        "carrier": "Qtel",
        "note": "Format: 974 55XX-XXXX or 55XX-XXXX"
      },
      {
        "number": "66",
        "carrier": "Qtel",
        "note": "Format: 974 66XX-XXXX or 66XX-XXXX"
      },
      {
        "number": "77",
        "carrier": "Vodafone",
        "note": "Format: 974 77XX-XXXX or 77XX-XXXX"
      }
    ]
  },
  {
    "name": "Romania",
    "dialCode": "+40",
    "code": "RO",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 9
    },
    "prefixes": [
      {
        "number": "70",
        "carrier": "Reserved for virtual operators",
        "note": null
      },
      {
        "number": "711",
        "carrier": "Telekom Romania",
        "note": null
      },
      {
        "number": "72",
        "carrier": "Vodafone Romania",
        "note": null
      },
      {
        "number": "73",
        "carrier": "Vodafone Romania",
        "note": null
      },
      {
        "number": "74",
        "carrier": "Orange Romania",
        "note": null
      },
      {
        "number": "75",
        "carrier": "Orange Romania",
        "note": null
      },
      {
        "number": "76",
        "carrier": "Telekom Romania",
        "note": null
      },
      {
        "number": "77",
        "carrier": "DigiMobil (RCS & RDS)",
        "note": null
      },
      {
        "number": "78",
        "carrier": "Zapp Mobile (merged with Telekom[13])",
        "note": null
      }
    ]
  },
  {
    "name": "Russia",
    "dialCode": "+7",
    "code": "RU",
    "notes": "Kaliningrad UTC +2/DST+3; Moscow, St. Petersburg, Astrakhan, Izhevsk, Samara UTC+3/DST+4; Perm, Nizhnevartovsk UTC+5/DST+6; Novosibirsk, Omsk UTC+6/DST+7; Norilsk, Kyzyl UTC+7/DST+8; Bratsk, Ulan-Ude UTC+8/DST+9; Chita, Yakutsk UTC+9/DST+10; Khabarovsk, Vladivostok, Yuzhno-Sakhalinsk UTC+10/DST+11; Magadan, Kamchatka UTC+11/DST+12.",
    "numberFormat": {
      max: 10,
      "min": 10
    },
    "prefixes": []
  },
  {
    "name": "Rwanda",
    "dialCode": "+250",
    "code": "RW",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 9
    },
    "prefixes": [
      {
        "number": "07",
        "carrier": null,
        "note": null
      },
      {
        "number": "08",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Saint Kitts and Nevis",
    "dialCode": "+1869",
    "code": "KN",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 10
    },
    "prefixes": [
      {
        "number": "869",
        "carrier": null,
        "note": "NANP member, no mobile-specific prefix"
      }
    ]
  },
  {
    "name": "Saint Lucia",
    "dialCode": "+1758",
    "code": "LC",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 10
    },
    "prefixes": [
      {
        "number": "758",
        "carrier": null,
        "note": "NANP member, no mobile-specific prefix"
      }
    ]
  },
  {
    "name": "Saint Pierre and Miquelon",
    "dialCode": "+508",
    "code": "PM",
    "notes": null,
    "numberFormat": {
      max: 6,
      "min": 6
    },
    "prefixes": [
      {
        "number": "55",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Saint Vincent and the Grenadines",
    "dialCode": "+1784",
    "code": "VC",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 10
    },
    "prefixes": [
      {
        "number": "784",
        "carrier": null,
        "note": "NANP member, no mobile-specific prefix"
      }
    ]
  },
  {
    "name": "Samoa",
    "dialCode": "+685",
    "code": "WS",
    "notes": null,
    "numberFormat": {
      max: 7,
      "min": 3
    },
    "prefixes": [
      {
        "number": "77",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "San Marino",
    "dialCode": "+378",
    "code": "SM",
    "notes": "When dialling from Italy to San Marino, the subscriber number must be prefixed by '0549' instead of '00378'. When dialling from San Marino to Italy, the complete national subscriber number must be used, without prefixing the number by '0039'.",
    "numberFormat": {
      max: 10,
      "min": 6
    },
    "prefixes": [
      {
        "number": "66",
        "carrier": "Prima",
        "note": "(see Italy for TMS customers)"
      }
    ]
  },
  {
    "name": "Sao Tome and Principe",
    "dialCode": "+239",
    "code": "ST",
    "notes": null,
    "numberFormat": {
      max: 7,
      "min": 7
    },
    "prefixes": []
  },
  {
    "name": "Saudi Arabia",
    "dialCode": "+966",
    "code": "SA",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 8
    },
    "prefixes": [
      {
        "number": "50",
        "carrier": "STC",
        "note": "Example 966 50 000 0000 with country code is twelve digits / national number 050 000 0000 with 0 prefix is ten digits)"
      },
      {
        "number": "51",
        "carrier": "Bravo",
        "note": "example 966510000000"
      },
      {
        "number": "53",
        "carrier": "STC",
        "note": "example 966530000000"
      },
      {
        "number": "54",
        "carrier": "mobily",
        "note": "example 966540000000"
      },
      {
        "number": "55",
        "carrier": "STC",
        "note": "example 966550000000"
      },
      {
        "number": "56",
        "carrier": "mobily",
        "note": "example 966560000000"
      },
      {
        "number": "57",
        "carrier": "Bravo",
        "note": "example 966570000000 is new"
      },
      {
        "number": "58",
        "carrier": "Zain",
        "note": "example 966580000000"
      },
      {
        "number": "59",
        "carrier": "Zain",
        "note": "example 966590000000"
      }
    ]
  },
  {
    "name": "Senegal",
    "dialCode": "+221",
    "code": "SN",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 9
    },
    "prefixes": [
      {
        "number": "76",
        "carrier": "Senegal Mobile Tigo",
        "note": null
      },
      {
        "number": "77",
        "carrier": "Senegal Mobile Orange",
        "note": null
      }
    ]
  },
  {
    "name": "Serbia",
    "dialCode": "+381",
    "code": "RS",
    "notes": null,
    "numberFormat": {
      max: 12,
      "min": 4
    },
    "prefixes": [
      {
        "number": "60",
        "carrier": "A1 Srbija",
        "note": null
      },
      {
        "number": "61",
        "carrier": "A1 Srbija",
        "note": null
      },
      {
        "number": "62",
        "carrier": "Yettel Serbia",
        "note": null
      },
      {
        "number": "63",
        "carrier": "Yettel Serbia",
        "note": null
      },
      {
        "number": "64",
        "carrier": "mt:s",
        "note": null
      },
      {
        "number": "65",
        "carrier": "mt:s",
        "note": null
      },
      {
        "number": "66",
        "carrier": "mt:s",
        "note": null
      },
      {
        "number": "677",
        "carrier": "Globaltel",
        "note": null
      },
      {
        "number": "68",
        "carrier": "A1 Srbija",
        "note": null
      },
      {
        "number": "69",
        "carrier": "Telenor Serbia",
        "note": null
      }
    ]
  },
  {
    "name": "Seychelles",
    "dialCode": "+248",
    "code": "SC",
    "notes": null,
    "numberFormat": {
      max: 7,
      "min": 7
    },
    "prefixes": [
      {
        "number": "25",
        "carrier": "Cable & Wireless",
        "note": null
      },
      {
        "number": "27",
        "carrier": "Airtel",
        "note": null
      }
    ]
  },
  {
    "name": "Sierra Leone",
    "dialCode": "+232",
    "code": "SL",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 8
    },
    "prefixes": [
      {
        "number": "23",
        "carrier": null,
        "note": null
      },
      {
        "number": "30",
        "carrier": null,
        "note": null
      },
      {
        "number": "33",
        "carrier": null,
        "note": null
      },
      {
        "number": "7",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Singapore",
    "dialCode": "+65",
    "code": "SG",
    "notes": "When dialling from Singapore to Malaysia, the area code and subscriber number must be prefixed by '020' instead of '00160'. When dialling from Malaysia to Singapore, the subscriber number must be prefixed by '02' instead of '0065'.",
    "numberFormat": {
      max: 12,
      "min": 8
    },
    "prefixes": [
      {
        "number": "8",
        "carrier": null,
        "note": null
      },
      {
        "number": "9",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Slovakia",
    "dialCode": "+421",
    "code": "SK",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 4
    },
    "prefixes": []
  },
  {
    "name": "Slovenia",
    "dialCode": "+386",
    "code": "SI",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 8
    },
    "prefixes": [
      {
        "number": "20",
        "carrier": null,
        "note": null
      },
      {
        "number": "21",
        "carrier": null,
        "note": null
      },
      {
        "number": "30",
        "carrier": "A1 Slovenija",
        "note": null
      },
      {
        "number": "31",
        "carrier": "Mobitel",
        "note": null
      },
      {
        "number": "40",
        "carrier": "A1 Slovenija",
        "note": null
      },
      {
        "number": "41",
        "carrier": "Mobitel",
        "note": null
      },
      {
        "number": "49",
        "carrier": "Mobitel",
        "note": null
      },
      {
        "number": "50",
        "carrier": null,
        "note": null
      },
      {
        "number": "51",
        "carrier": "Mobitel",
        "note": null
      },
      {
        "number": "60",
        "carrier": null,
        "note": null
      },
      {
        "number": "61",
        "carrier": null,
        "note": null
      },
      {
        "number": "64",
        "carrier": "T-2",
        "note": null
      },
      {
        "number": "70",
        "carrier": "Telemach Slovenija",
        "note": null
      },
      {
        "number": "71",
        "carrier": "Mobitel",
        "note": null
      }
    ]
  },
  {
    "name": "Solomon Islands",
    "dialCode": "+677",
    "code": "SB",
    "notes": null,
    "numberFormat": {
      max: 5,
      "min": 5
    },
    "prefixes": [
      {
        "number": "72",
        "carrier": null,
        "note": null
      },
      {
        "number": "74",
        "carrier": null,
        "note": null
      },
      {
        "number": "75",
        "carrier": null,
        "note": null
      },
      {
        "number": "86",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Somalia",
    "dialCode": "+252",
    "code": "SO",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 5
    },
    "prefixes": [
      {
        "number": "61",
        "carrier": null,
        "note": null
      },
      {
        "number": "62",
        "carrier": null,
        "note": null
      },
      {
        "number": "63",
        "carrier": null,
        "note": null
      },
      {
        "number": "68",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "South Africa",
    "dialCode": "+27",
    "code": "ZA",
    "notes": "The '0' is used on all domestic calls, including in the same city, but is omitted when dialling from other countries.",
    "numberFormat": {
      max: 9,
      "min": 9
    },
    "prefixes": [
      {
        "number": "60",
        "carrier": "MTN",
        "note": null
      },
      {
        "number": "710",
        "carrier": "MTN",
        "note": null
      },
      {
        "number": "711",
        "carrier": "Vodacom",
        "note": null
      },
      {
        "number": "712",
        "carrier": "Vodacom",
        "note": null
      },
      {
        "number": "713",
        "carrier": "Vodacom",
        "note": null
      },
      {
        "number": "714",
        "carrier": "Vodacom",
        "note": null
      },
      {
        "number": "715",
        "carrier": "Vodacom",
        "note": null
      },
      {
        "number": "716",
        "carrier": "Vodacom",
        "note": null
      },
      {
        "number": "717",
        "carrier": "MTN",
        "note": null
      },
      {
        "number": "718",
        "carrier": "MTN",
        "note": null
      },
      {
        "number": "719",
        "carrier": "MTN",
        "note": null
      },
      {
        "number": "72",
        "carrier": "Vodacom",
        "note": null
      },
      {
        "number": "73",
        "carrier": "MTN",
        "note": null
      },
      {
        "number": "74",
        "carrier": "Cell C",
        "note": null
      },
      {
        "number": "741",
        "carrier": "Virgin Mobile",
        "note": null
      },
      {
        "number": "76",
        "carrier": "Vodacom",
        "note": null
      },
      {
        "number": "78",
        "carrier": "MTN",
        "note": null
      },
      {
        "number": "79",
        "carrier": "Vodacom",
        "note": null
      },
      {
        "number": "811",
        "carrier": "Telkom (South Africa)",
        "note": null
      },
      {
        "number": "812",
        "carrier": "Telkom (South Africa)",
        "note": null
      },
      {
        "number": "813",
        "carrier": "Telkom (South Africa)",
        "note": null
      },
      {
        "number": "814",
        "carrier": "Telkom (South Africa)",
        "note": null
      },
      {
        "number": "82",
        "carrier": "Vodacom",
        "note": null
      },
      {
        "number": "83",
        "carrier": "MTN",
        "note": null
      },
      {
        "number": "84",
        "carrier": "Cell C",
        "note": null
      }
    ]
  },
  {
    "name": "Spain",
    "dialCode": "+34",
    "code": "ES",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 9
    },
    "prefixes": [
      {
        "number": "6",
        "carrier": null,
        "note": null
      },
      {
        "number": "7",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Sri Lanka",
    "dialCode": "+94",
    "code": "LK",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 9
    },
    "prefixes": [
      {
        "number": "70",
        "carrier": "Mobitel",
        "note": null
      },
      {
        "number": "71",
        "carrier": "Mobitel",
        "note": null
      },
      {
        "number": "72",
        "carrier": "Hutch *(previously used by Etisalat)[14]",
        "note": null
      },
      {
        "number": "74",
        "carrier": "Dialog",
        "note": null
      },
      {
        "number": "75",
        "carrier": "Airtel",
        "note": null
      },
      {
        "number": "76",
        "carrier": "Dialog",
        "note": null
      },
      {
        "number": "77",
        "carrier": "Dialog",
        "note": null
      },
      {
        "number": "78",
        "carrier": "Hutch",
        "note": null
      }
    ]
  },
  {
    "name": "Sudan",
    "dialCode": "+249",
    "code": "SD",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 9
    },
    "prefixes": [
      {
        "number": "9",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Suriname",
    "dialCode": "+597",
    "code": "SR",
    "notes": null,
    "numberFormat": {
      max: 7,
      "min": 6
    },
    "prefixes": [
      {
        "number": "8",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Sweden",
    "dialCode": "+46",
    "code": "SE",
    "notes": null,
    "numberFormat": {
      max: 13,
      "min": 7
    },
    "prefixes": [
      {
        "number": "70",
        "carrier": null,
        "note": null
      },
      {
        "number": "710",
        "carrier": null,
        "note": null
      },
      {
        "number": "72",
        "carrier": null,
        "note": null
      },
      {
        "number": "7300",
        "carrier": "TeliaSonera Sv. AB",
        "note": null
      },
      {
        "number": "7301",
        "carrier": "Wireless Maingate N",
        "note": null
      },
      {
        "number": "7302",
        "carrier": "TeliaSonera Sv. AB",
        "note": null
      },
      {
        "number": "7303",
        "carrier": "TeliaSonera Sv. AB",
        "note": null
      },
      {
        "number": "7304",
        "carrier": "TeliaSonera Sv. AB",
        "note": null
      },
      {
        "number": "7305",
        "carrier": "TeliaSonera Sv. AB",
        "note": null
      },
      {
        "number": "7306",
        "carrier": "TeliaSonera Sv. AB",
        "note": null
      },
      {
        "number": "7307",
        "carrier": "TeliaSonera Sv. AB",
        "note": null
      },
      {
        "number": "7308",
        "carrier": "TeliaSonera Sv. AB",
        "note": null
      },
      {
        "number": "7309",
        "carrier": "TeliaSonera Sv. AB",
        "note": null
      },
      {
        "number": "7310",
        "carrier": "Timepiece Servicos",
        "note": null
      },
      {
        "number": "7311",
        "carrier": "Wireless Maingate N",
        "note": null
      },
      {
        "number": "7312",
        "carrier": "Ledig",
        "note": null
      },
      {
        "number": "7313",
        "carrier": "Wireless Maingate M",
        "note": null
      },
      {
        "number": "7314",
        "carrier": "Campuz Mobile AB",
        "note": null
      },
      {
        "number": "7315",
        "carrier": "Campuz Mobile AB",
        "note": null
      },
      {
        "number": "7316",
        "carrier": "Abbla Mobile Sv. AB",
        "note": null
      },
      {
        "number": "73170",
        "carrier": "Netnet AS",
        "note": null
      },
      {
        "number": "73171",
        "carrier": "Ledig",
        "note": null
      },
      {
        "number": "73172",
        "carrier": "Ledig",
        "note": null
      },
      {
        "number": "73173",
        "carrier": "Ledig",
        "note": null
      },
      {
        "number": "73174",
        "carrier": "Ledig",
        "note": null
      },
      {
        "number": "73175",
        "carrier": "Ledig",
        "note": null
      },
      {
        "number": "73176",
        "carrier": "Ledig",
        "note": null
      },
      {
        "number": "73177",
        "carrier": "Ledig",
        "note": null
      },
      {
        "number": "73178",
        "carrier": "Ledig",
        "note": null
      },
      {
        "number": "73179",
        "carrier": "Ledig",
        "note": null
      },
      {
        "number": "7318",
        "carrier": "ACN Communications S",
        "note": null
      },
      {
        "number": "7319",
        "carrier": "Terraflex Europe LPP",
        "note": null
      },
      {
        "number": "7320",
        "carrier": "Telenor Sverige AB",
        "note": null
      },
      {
        "number": "7321",
        "carrier": "Optimal Telecom Sver",
        "note": null
      },
      {
        "number": "7322",
        "carrier": "Optimal Telecom Sver",
        "note": null
      },
      {
        "number": "7323",
        "carrier": "Telenor Sverige AB",
        "note": null
      },
      {
        "number": "7324",
        "carrier": "Telenor Mobile Sv.",
        "note": null
      },
      {
        "number": "7325",
        "carrier": "Telenor Mobile Sv.",
        "note": null
      },
      {
        "number": "7326",
        "carrier": "Telenor Mobile Sv.",
        "note": null
      },
      {
        "number": "7327",
        "carrier": "Ventelo Sverige AB",
        "note": null
      },
      {
        "number": "7328",
        "carrier": "Chess AB",
        "note": null
      },
      {
        "number": "7329",
        "carrier": "Telogic ApS",
        "note": null
      },
      {
        "number": "733",
        "carrier": "Telenor Sverige AB",
        "note": null
      },
      {
        "number": "7340 - 44",
        "carrier": "Telenor Sverige AB",
        "note": null
      },
      {
        "number": "7341",
        "carrier": "Telenor Sverige AB",
        "note": null
      },
      {
        "number": "7342",
        "carrier": "Telenor Sverige AB",
        "note": null
      },
      {
        "number": "7342",
        "carrier": "Telenor Sverige AB",
        "note": null
      },
      {
        "number": "7343",
        "carrier": "Telenor Sverige AB",
        "note": null
      },
      {
        "number": "7344",
        "carrier": "Telenor Sverige AB",
        "note": null
      },
      {
        "number": "73450",
        "carrier": "Telogic ApS",
        "note": null
      },
      {
        "number": "73451",
        "carrier": "Telogic ApS",
        "note": null
      },
      {
        "number": "73452",
        "carrier": "Telogic ApS",
        "note": null
      },
      {
        "number": "73453",
        "carrier": "Telogic ApS",
        "note": null
      },
      {
        "number": "73454",
        "carrier": "Telogic ApS",
        "note": null
      },
      {
        "number": "73455",
        "carrier": "Ledig",
        "note": null
      },
      {
        "number": "73456",
        "carrier": "Intelligent Appl. AB",
        "note": null
      },
      {
        "number": "73457",
        "carrier": "Ledig",
        "note": null
      },
      {
        "number": "73458",
        "carrier": "Ledig",
        "note": null
      },
      {
        "number": "73459",
        "carrier": "Ledig",
        "note": null
      },
      {
        "number": "7346",
        "carrier": "Ledig",
        "note": null
      },
      {
        "number": "7347",
        "carrier": "Ledig",
        "note": null
      },
      {
        "number": "7348",
        "carrier": "Ledig",
        "note": null
      },
      {
        "number": "7349",
        "carrier": "Ledig",
        "note": null
      },
      {
        "number": "7350",
        "carrier": "Hi3G Access AB",
        "note": null
      },
      {
        "number": "7351",
        "carrier": "Hi3G Access AB",
        "note": null
      },
      {
        "number": "7352",
        "carrier": "Hi3G Access AB",
        "note": null
      },
      {
        "number": "7353",
        "carrier": "Hi3G Access AB",
        "note": null
      },
      {
        "number": "7354",
        "carrier": "Hi3G Access AB",
        "note": null
      },
      {
        "number": "73 55",
        "carrier": "Tele2 Sverige AB",
        "note": null
      },
      {
        "number": "73 56",
        "carrier": "Tele2 Sverige AB",
        "note": null
      },
      {
        "number": "73 57",
        "carrier": "Tele2 Sverige AB",
        "note": null
      },
      {
        "number": "73 58",
        "carrier": "Tele2 Sverige AB",
        "note": null
      },
      {
        "number": "73 59",
        "carrier": "Tele2 Sverige AB",
        "note": null
      },
      {
        "number": "736",
        "carrier": "Tele2 Sverige AB",
        "note": null
      },
      {
        "number": "7370",
        "carrier": "Tele2 Sverige AB",
        "note": null
      },
      {
        "number": "7371",
        "carrier": "Tele2 Sverige AB",
        "note": null
      },
      {
        "number": "7372",
        "carrier": "Tele2 Sverige AB",
        "note": null
      },
      {
        "number": "7373",
        "carrier": "Tele2 Sverige AB",
        "note": null
      },
      {
        "number": "7374",
        "carrier": "Tele2 Sverige AB",
        "note": null
      },
      {
        "number": "7375",
        "carrier": "Tele2 Sverige AB",
        "note": null
      },
      {
        "number": "7376",
        "carrier": "Tele2 Sverige AB",
        "note": null
      },
      {
        "number": "7377",
        "carrier": "Tele2 Sverige AB",
        "note": null
      },
      {
        "number": "7378",
        "carrier": "Tele2 Sverige AB",
        "note": null
      },
      {
        "number": "7379",
        "carrier": "Tele2 Sverige AB",
        "note": null
      },
      {
        "number": "7380",
        "carrier": "TeliaSonera Sv. AB",
        "note": null
      },
      {
        "number": "7381",
        "carrier": "TeliaSonera Sv. AB",
        "note": null
      },
      {
        "number": "7382",
        "carrier": "TeliaSonera Sv. AB",
        "note": null
      },
      {
        "number": "7383",
        "carrier": "TeliaSonera Sv. AB",
        "note": null
      },

      {
        "number": "7384",
        "carrier": "TeliaSonera Sv. AB",
        "note": null
      },
      {
        "number": "7385",
        "carrier": "Telenor Sverige AB",
        "note": null
      },
      {
        "number": "7386",
        "carrier": "Lebara Ltd.",
        "note": null
      },
      {
        "number": "7387",
        "carrier": "Ledig",
        "note": null
      },
      {
        "number": "7388",
        "carrier": "Newphone SP AB",
        "note": null
      },
      {
        "number": "7389",
        "carrier": "Ledig",
        "note": null
      },
      {
        "number": "739",
        "carrier": "Tele2 Sverige AB",
        "note": null
      },
      {
        "number": "76",
        "carrier": null,
        "note": null
      },
      {
        "number": "79",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Switzerland",
    "dialCode": "+41",
    "code": "CH",
    "notes": "The '0' is used on all domestic calls, including in the same city, but is omitted when dialling from other countries.",
    "numberFormat": {
      max: 12,
      "min": 4
    },
    "prefixes": [
      {
        "number": "74",
        "carrier": null,
        "note": null
      },
      {
        "number": "75",
        "carrier": "Swisscom (second mobile dialling code)",
        "note": "Other operators can use these indexes, as long as they use network nodes of this three operators."
      },
      {
        "number": "76",
        "carrier": "Sunrise (TDC Switzerland)",
        "note": "Other operators can use these indexes, as long as they use network nodes of this three operators."
      },
      {
        "number": "77",
        "carrier": "Swisscom Used by Migros",
        "note": "Other operators can use these indexes, as long as they use network nodes of this three operators."
      },
      {
        "number": "78",
        "carrier": "Salt Mobile (formerly Orange Switzerland)",
        "note": "Other operators can use these indexes, as long as they use network nodes of this three operators."
      },
      {
        "number": "79",
        "carrier": "Swisscom",
        "note": "Other operators can use these indexes, as long as they use network nodes of this three operators."
      }
    ]
  },
  {
    "name": "Taiwan",
    "dialCode": "+886",
    "code": "TW",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 8
    },
    "prefixes": [
      {
        "number": "9",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Tajikistan",
    "dialCode": "+992",
    "code": "TJ",
    "notes": "When dialling between Kenya, Tanzania and Uganda the national (significant) number must be prefixed by 005 for Kenya, by 006 for Uganda and by 007 for Tanzania",
    "numberFormat": {
      max: 9,
      "min": 9
    },
    "prefixes": [
      {
        "number": "9",
        "carrier": null,
        "note": null
      },
      {
        "number": "90",
        "carrier": "MLT GSM/3G",
        "note": null
      },
      {
        "number": "910",
        "carrier": "Beeline-TJ GSM/3G",
        "note": null
      },
      {
        "number": "911",
        "carrier": "Beeline-TJ GSM/3G",
        "note": null
      },
      {
        "number": "912",
        "carrier": "Beeline-TJ GSM/3G",
        "note": null
      },
      {
        "number": "913",
        "carrier": "Beeline-TJ GSM/3G",
        "note": null
      },
      {
        "number": "914",
        "carrier": "Beeline-TJ GSM/3G",
        "note": null
      },
      {
        "number": "915",
        "carrier": "Beeline-TJ GSM/3G",
        "note": null
      },
      {
        "number": "916",
        "carrier": "Beeline-TJ GSM/3G",
        "note": null
      },
      {
        "number": "917",
        "carrier": "Beeline-TJ GSM/3G",
        "note": null
      },
      {
        "number": "918",
        "carrier": "Babilon-Mobile GSM/3G",
        "note": null
      },
      {
        "number": "919",
        "carrier": "Beeline-TJ GSM/3G",
        "note": null
      },
      {
        "number": "92",
        "carrier": "TCell-Somoncom GSM/3G",
        "note": null
      },
      {
        "number": "93",
        "carrier": "TCell-Tajikistan GSM/3G",
        "note": null
      },
      {
        "number": "95",
        "carrier": "TK-Mobile CDMA",
        "note": null
      },
      {
        "number": "96",
        "carrier": "M.Teko CDMA",
        "note": null
      },
      {
        "number": "97",
        "carrier": "Skytel CDMA",
        "note": null
      },
      {
        "number": "98",
        "carrier": "Babilon-Mobile GSM/3G",
        "note": null
      }
    ]
  },
  {
    "name": "Thailand",
    "dialCode": "+66",
    "code": "TH",
    "notes": "The '0' is used on all domestic calls, including in the same city, but is omitted when dialling from other countries.",
    "numberFormat": {
      max: 9,
      "min": 8
    },
    "prefixes": [
      {
        "number": "6",
        "carrier": null,
        "note": null
      },
      {
        "number": "8",
        "carrier": null,
        "note": null
      },
      {
        "number": "9",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Togo",
    "dialCode": "+228",
    "code": "TG",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 8
    },
    "prefixes": [
      {
        "number": "90",
        "carrier": "Togocel",
        "note": null
      },
      {
        "number": "91",
        "carrier": "Togocel",
        "note": null
      },
      {
        "number": "92",
        "carrier": "Togocel",
        "note": null
      },
      {
        "number": "97",
        "carrier": "Moov Togo",
        "note": null
      },
      {
        "number": "98",
        "carrier": "Moov Togo",
        "note": null
      },
      {
        "number": "99",
        "carrier": "Moov Togo",
        "note": null
      }
    ]
  },
  {
    "name": "Tokelau",
    "dialCode": "+690",
    "code": "TK",
    "notes": null,
    "numberFormat": {
      max: 4,
      "min": 4
    },
    "prefixes": [
      {
        "number": "??",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Tonga",
    "dialCode": "+676",
    "code": "TO",
    "notes": null,
    "numberFormat": {
      max: 7,
      "min": 5
    },
    "prefixes": [
      {
        "number": "15",
        "carrier": null,
        "note": null
      },
      {
        "number": "16",
        "carrier": null,
        "note": null
      },
      {
        "number": "17",
        "carrier": null,
        "note": null
      },
      {
        "number": "18",
        "carrier": null,
        "note": null
      },
      {
        "number": "19",
        "carrier": null,
        "note": null
      },
      {
        "number": "87",
        "carrier": null,
        "note": null
      },
      {
        "number": "88",
        "carrier": null,
        "note": null
      },
      {
        "number": "89",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Trinidad and Tobago",
    "dialCode": "+1868",
    "code": "TT",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 10
    },
    "prefixes": [
      {
        "number": "868",
        "carrier": "Trinidad and Tobago Cellular",
        "note": "1-868-620, 1-868-678,+1-868-700 to 1-868-799,+1-868-680 to 1-868-689"
      }
    ]
  },
  {
    "name": "Tunisia",
    "dialCode": "+216",
    "code": "TN",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 8
    },
    "prefixes": [
      {
        "number": "2",
        "carrier": "Tunisia Mobile Ooredoo",
        "note": null
      },
      {
        "number": "3",
        "carrier": "Tunisia Mobile Orange",
        "note": null
      },
      {
        "number": "4",
        "carrier": "Tunisia Mobile Tuntel",
        "note": null
      },
      {
        "number": "5",
        "carrier": "Tunisia Mobile Orange",
        "note": null
      },
      {
        "number": "9",
        "carrier": "Tunisia Mobile Tuntel",
        "note": null
      }
    ]
  },
  {
    "name": "Turkey",
    "dialCode": "+90",
    "code": "TR",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 10
    },
    "prefixes": [
      {
        "number": "50",
        "carrier": "Türk Telekom",
        "note": "Format: +90 50X-XXX-XX-XX or 050X-XXX-XX-XX"
      },
      {
        "number": "53",
        "carrier": "Turkcell",
        "note": "Format: +90 53X-XXX-XX-XX or 053X-XXX-XX-XX"
      },
      {
        "number": "54",
        "carrier": "Vodafone Turkey",
        "note": "Format: +90 54X-XXX-XX-XX or 054X-XXX-XX-XX"
      },
      {
        "number": "55",
        "carrier": "Türk Telekom",
        "note": "Format: +90 55X-XXX-XX-XX or 055X-XXX-XX-XX"
      }
    ]
  },
  {
    "name": "Turkmenistan",
    "dialCode": "+993",
    "code": "TM",
    "notes": null,
    "numberFormat": {
      max: 8,
      "min": 8
    },
    "prefixes": [
      {
        "number": "65",
        "carrier": "TMCELL",
        "note": null
      },
      {
        "number": "66",
        "carrier": "BCTI (MTS)",
        "note": null
      },
      {
        "number": "67",
        "carrier": "BCTI (MTS)",
        "note": null
      }
    ]
  },
  {
    "name": "Turks and Caicos Islands",
    "dialCode": "+1649",
    "code": "TC",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 10
    },
    "prefixes": [
      {
        "number": "649",
        "carrier": null,
        "note": "NANP member, no mobile-specific prefix"
      }
    ]
  },
  {
    "name": "Tuvalu",
    "dialCode": "+688",
    "code": "TV",
    "notes": null,
    "numberFormat": {
      max: 6,
      "min": 5
    },
    "prefixes": []
  },
  {
    "name": "Uganda",
    "dialCode": "+256",
    "code": "UG",
    "notes": "When dialling between Kenya, Tanzania and Uganda the national (significant) number must be prefixed by 005 for Kenya, by 006 for Uganda and by 007 for Tanzania",
    "numberFormat": {
      max: 9,
      "min": 9
    },
    "prefixes": []
  },
  {
    "name": "Ukraine",
    "dialCode": "+380",
    "code": "UA",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 9
    },
    "prefixes": [
      {
        "number": "50",
        "carrier": "Vodafone Ukraine",
        "note": null
      },
      {
        "number": "63",
        "carrier": "Lifecell (Astelit)",
        "note": null
      },
      {
        "number": "66",
        "carrier": "Vodafone Ukraine",
        "note": null
      },
      {
        "number": "67",
        "carrier": "Kyivstar",
        "note": null
      },
      {
        "number": "73",
        "carrier": "Lifecell (Astelit)",
        "note": null
      },
      {
        "number": "91",
        "carrier": "UTEL",
        "note": null
      },
      {
        "number": "92",
        "carrier": "PEOPLEnet",
        "note": null
      },
      {
        "number": "93",
        "carrier": "Lifecell (Astelit)",
        "note": null
      },
      {
        "number": "94",
        "carrier": "Intertelecom",
        "note": null
      },
      {
        "number": "95",
        "carrier": "Vodafone Ukraine",
        "note": null
      },
      {
        "number": "96",
        "carrier": "Kyivstar",
        "note": null
      },
      {
        "number": "97",
        "carrier": "Kyivstar",
        "note": null
      },
      {
        "number": "98",
        "carrier": "Kyivstar",
        "note": null
      },
      {
        "number": "99",
        "carrier": "Vodafone Ukraine",
        "note": null
      }
    ]
  },
  {
    "name": "United Arab Emirates",
    "dialCode": "+971",
    "code": "AE",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 8
    },
    "prefixes": [
      {
        "number": "50",
        "carrier": "Etisalat",
        "note": "example 971 500 000 000 with country code is 12 digits"
      },
      {
        "number": "52",
        "carrier": "Du",
        "note": "example 971 520 000 000 with country code is 12 digits"
      },
      {
        "number": "53",
        "carrier": "Virgin Mobile",
        "note": "example 971 530 000 000 with country code is 12 digits"
      },
      {
        "number": "54",
        "carrier": "Etisalat",
        "note": "example 971 540 000 000 with country code is 12 digits"
      },
      {
        "number": "55",
        "carrier": "Du",
        "note": "example 971 550 000 000 with country code is 12 digits"
      },
      {
        "number": "56",
        "carrier": "Etisalat",
        "note": "example 971 560 000 000 with country code is 12 digits"
      }
    ]
  },
  {
    "name": "United Kingdom",
    "dialCode": "+44",
    "code": "GB",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 7
    },
    "prefixes": []
  },
  {
    "name": "United States",
    "dialCode": "+1",
    "code": "US",
    "notes": "Eastern Time UTC-5/DST-4; Central Time UTC-6/DST-5; Mountain Time UTC-7; Pacific Time UTC-8/DST-7; Alaska UTC-9/DST-8; Hawaiian UTC-10.",
    "numberFormat": {
      max: 10,
      "min": 10
    },
    "prefixes": []
  },
  {
    "name": "Uruguay",
    "dialCode": "+598",
    "code": "UY",
    "notes": null,
    "numberFormat": {
      max: 11,
      "min": 4
    },
    "prefixes": [
      {
        "number": "91",
        "carrier": "Ancel",
        "note": null
      },
      {
        "number": "93",
        "carrier": "Movistar",
        "note": null
      },
      {
        "number": "94",
        "carrier": "Movistar",
        "note": null
      },
      {
        "number": "95",
        "carrier": "Movistar",
        "note": null
      },
      {
        "number": "96",
        "carrier": "Claro",
        "note": null
      },
      {
        "number": "97",
        "carrier": "Claro",
        "note": null
      },
      {
        "number": "98",
        "carrier": "Ancel",
        "note": null
      },
      {
        "number": "99",
        "carrier": "Ancel",
        "note": null
      }
    ]
  },
  {
    "name": "Uzbekistan",
    "dialCode": "+998",
    "code": "UZ",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 9
    },
    "prefixes": [
      {
        "number": "90",
        "carrier": "Beeline (\"Unitel\" LLC subsidiary of \"ВымпелКом\" PTD)",
        "note": null
      },
      {
        "number": "91",
        "carrier": "Beeline (\"Unitel\" LLC subsidiary of \"ВымпелКом\" PTD)",
        "note": null
      },
      {
        "number": "93",
        "carrier": "UCell (\"COSCOM\" LLC subsidiary of \"TeliaSonera\" Public Enterprise)",
        "note": null
      },
      {
        "number": "94",
        "carrier": "UCell (\"COSCOM\" LLC subsidiary of \"TeliaSonera\" Public Enterprise)",
        "note": null
      },
      {
        "number": "97",
        "carrier": "UMS (\"Uzdunrobita\" LLC subsidiary of \"Мобильные ТелеСистемы\" PTD)",
        "note": null
      },
      {
        "number": "33",
        "carrier": "Humans.uz",
        "note": null
      }
    ]
  },
  {
    "name": "Vanuatu",
    "dialCode": "+678",
    "code": "VU",
    "notes": null,
    "numberFormat": {
      max: 7,
      "min": 5
    },
    "prefixes": [
      {
        "number": "4",
        "carrier": null,
        "note": null
      },
      {
        "number": "5",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Vietnam",
    "dialCode": "+84",
    "code": "VN",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 7
    },
    "prefixes": [
      {
        "number": "3",
        "carrier": null,
        "note": "See Telephone numbers in Vietnam"
      },
      {
        "number": "5",
        "carrier": null,
        "note": "See Telephone numbers in Vietnam"
      },
      {
        "number": "7",
        "carrier": null,
        "note": "See Telephone numbers in Vietnam"
      },
      {
        "number": "8",
        "carrier": null,
        "note": "See Telephone numbers in Vietnam"
      },
      {
        "number": "9",
        "carrier": null,
        "note": "See Telephone numbers in Vietnam"
      }
    ]
  },
  {
    "name": "Wallis and Futuna",
    "dialCode": "+681",
    "code": "WF",
    "notes": null,
    "numberFormat": {
      max: 6,
      "min": 6
    },
    "prefixes": []
  },
  {
    "name": "Yemen",
    "dialCode": "+967",
    "code": "YE",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 6
    },
    "prefixes": [
      {
        "number": "7",
        "carrier": null,
        "note": null
      },
      {
        "number": "70",
        "carrier": "Y (Yemen)",
        "note": null
      },
      {
        "number": "71",
        "carrier": "Sabafon",
        "note": null
      },
      {
        "number": "73",
        "carrier": "MTN",
        "note": null
      },
      {
        "number": "77",
        "carrier": "Yemen Mobile",
        "note": null
      }
    ]
  },
  {
    "name": "Zambia",
    "dialCode": "+260",
    "code": "ZM",
    "notes": null,
    "numberFormat": {
      max: 9,
      "min": 9
    },
    "prefixes": [
      {
        "number": "9",
        "carrier": null,
        "note": null
      }
    ]
  },
  {
    "name": "Zimbabwe",
    "dialCode": "+263",
    "code": "ZW",
    "notes": null,
    "numberFormat": {
      max: 10,
      "min": 5
    },
    "prefixes": [
      {
        "number": "71",
        "carrier": "Net One",
        "note": null
      },
      {
        "number": "73",
        "carrier": "Telecel Zimbabwe",
        "note": null
      },
      {
        "number": "77",
        "carrier": "Econet Zimbabwe",
        "note": null
      }
    ]
  }
]

export function getFlagEmoji(countryCode: COUNTRY_CODE) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char =>  127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export function getCountryCode(code:string):COUNTRY_CODE_DATA{
  const index = countryCodeList.findIndex(x=>x.code == code);
  if(index< 0)
    throw new Error("Country Code Data is Invalid");
  return countryCodeList[index];
}