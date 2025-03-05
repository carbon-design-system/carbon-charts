import { type ChoroplethChartOptions, type ChartTabularData } from '@carbon/charts'
import { worldTopoJson } from './topojson-110'
import type { ChartTypes, Example } from '../types'

const vanilla = 'ChoroplethChart'

export const chartTypes: ChartTypes = {
	vanilla,
	svelte: vanilla,
	react: vanilla,
	angular: 'ibm-choropleth-chart',
	vue: `CcvChoroplethChart`
}

const options: ChoroplethChartOptions = {
	title: 'Geo data',
	geoData: worldTopoJson
}

export const missingDataOptions: ChoroplethChartOptions = {
	title: 'Missing data',
	geoData: worldTopoJson
}

export const customColorsOptions: ChoroplethChartOptions = {
	title: 'Custom colors',
	color: {
		gradient: {
			colors: ['#0f62fe', '#ffc2c5', '#8d8d8d']
		}
	},
	geoData: worldTopoJson
}

const data: ChartTabularData = [
	{
		name: 'Fiji',
		id: 'FJI',
		value: 45
	},
	{
		name: 'Tanzania',
		id: 'TZA',
		value: 71
	},
	{
		name: 'W. Sahara',
		id: 'B28',
		value: 24
	},
	{
		name: 'Canada',
		id: 'CAN',
		value: 84
	},
	{
		name: 'United States of America',
		id: 'USA',
		value: 27
	},
	{
		name: 'Kazakhstan',
		id: 'KAZ',
		value: 22
	},
	{
		name: 'Uzbekistan',
		id: 'UZB',
		value: 92
	},
	{
		name: 'Papua New Guinea',
		id: 'PN1',
		value: 29
	},
	{
		name: 'Indonesia',
		id: 'IDN',
		value: 95
	},
	{
		name: 'Argentina',
		id: 'ARG',
		value: 85
	},
	{
		name: 'Chile',
		id: 'CHL',
		value: 74
	},
	{
		name: 'Dem. Rep. Congo',
		id: 'COD',
		value: 95
	},
	{
		name: 'Somalia',
		id: 'SOM',
		value: 50
	},
	{
		name: 'Kenya',
		id: 'KEN',
		value: 17
	},
	{
		name: 'Sudan',
		id: 'SDZ',
		value: 12
	},
	{
		name: 'Chad',
		id: 'TCD',
		value: 17
	},
	{
		name: 'Haiti',
		id: 'HTI',
		value: 21
	},
	{
		name: 'Dominican Rep.',
		id: 'DOM',
		value: 53
	},
	{
		name: 'Russia',
		id: 'RUS',
		value: 62
	},
	{
		name: 'Bahamas',
		id: 'BHS',
		value: 63
	},
	{
		name: 'Falkland Is.',
		id: 'B12',
		value: 75
	},
	{
		name: 'Norway',
		id: 'NOR',
		value: 23
	},
	{
		name: 'Greenland',
		id: 'GRL',
		value: 94
	},
	{
		name: 'Fr. S. Antarctic Lands',
		id: 'ATF',
		value: 90
	},
	{
		name: 'Timor-Leste',
		id: 'TLS',
		value: 91
	},
	{
		name: 'South Africa',
		id: 'ZAF',
		value: 46
	},
	{
		name: 'Lesotho',
		id: 'LSO',
		value: 36
	},
	{
		name: 'Mexico',
		id: 'MEX',
		value: 81
	},
	{
		name: 'Uruguay',
		id: 'URY',
		value: 53
	},
	{
		name: 'Brazil',
		id: 'BRA',
		value: 32
	},
	{
		name: 'Bolivia',
		id: 'BOL',
		value: 44
	},
	{
		name: 'Peru',
		id: 'PER',
		value: 41
	},
	{
		name: 'Colombia',
		id: 'COL',
		value: 11
	},
	{
		name: 'Panama',
		id: 'PAN',
		value: 30
	},
	{
		name: 'Costa Rica',
		id: 'CRI',
		value: 6
	},
	{
		name: 'Nicaragua',
		id: 'NIC',
		value: 96
	},
	{
		name: 'Honduras',
		id: 'HND',
		value: 20
	},
	{
		name: 'El Salvador',
		id: 'SLV',
		value: 31
	},
	{
		name: 'Guatemala',
		id: 'GTM',
		value: 71
	},
	{
		name: 'Belize',
		id: 'BLZ',
		value: 65
	},
	{
		name: 'Venezuela',
		id: 'VEN',
		value: 40
	},
	{
		name: 'Guyana',
		id: 'GUY',
		value: 66
	},
	{
		name: 'Suriname',
		id: 'SUR',
		value: 46
	},
	{
		name: 'France',
		id: 'FRA',
		value: 99
	},
	{
		name: 'Ecuador',
		id: 'ECU',
		value: 17
	},
	{
		name: 'Puerto Rico',
		id: 'PRI',
		value: 98
	},
	{
		name: 'Jamaica',
		id: 'JAM',
		value: 81
	},
	{
		name: 'Cuba',
		id: 'CUB',
		value: 50
	},
	{
		name: 'Zimbabwe',
		id: 'ZWE',
		value: 96
	},
	{
		name: 'Botswana',
		id: 'BWA',
		value: 81
	},
	{
		name: 'Namibia',
		id: 'NAM',
		value: 94
	},
	{
		name: 'Senegal',
		id: 'SEN',
		value: 15
	},
	{
		name: 'Mali',
		id: 'MLI',
		value: 47
	},
	{
		name: 'Mauritania',
		id: 'MRT',
		value: 92
	},
	{
		name: 'Benin',
		id: 'BEN',
		value: 13
	},
	{
		name: 'Niger',
		id: 'NER',
		value: 59
	},
	{
		name: 'Nigeria',
		id: 'NGA',
		value: 9
	},
	{
		name: 'Cameroon',
		id: 'CMR',
		value: 50
	},
	{
		name: 'Togo',
		id: 'TGO',
		value: 99
	},
	{
		name: 'Ghana',
		id: 'GHA',
		value: 35
	},
	{
		name: "Côte d'Ivoire",
		id: 'CIV',
		value: 18
	},
	{
		name: 'Guinea',
		id: 'GIN',
		value: 93
	},
	{
		name: 'Guinea-Bissau',
		id: 'GNB',
		value: 100
	},
	{
		name: 'Liberia',
		id: 'LBR',
		value: 55
	},
	{
		name: 'Sierra Leone',
		id: 'SLE',
		value: 17
	},
	{
		name: 'Burkina Faso',
		id: 'BFA',
		value: 41
	},
	{
		name: 'Central African Rep.',
		id: 'CAF',
		value: 46
	},
	{
		name: 'Congo',
		id: 'COG',
		value: 90
	},
	{
		name: 'Gabon',
		id: 'GAB',
		value: 6
	},
	{
		name: 'Eq. Guinea',
		id: 'GNQ',
		value: 83
	},
	{
		name: 'Zambia',
		id: 'ZMB',
		value: 46
	},
	{
		name: 'Malawi',
		id: 'MWI',
		value: 70
	},
	{
		name: 'Mozambique',
		id: 'MOZ',
		value: 89
	},
	{
		name: 'eSwatini',
		id: 'SWZ',
		value: 57
	},
	{
		name: 'Angola',
		id: 'AGO',
		value: 63
	},
	{
		name: 'Burundi',
		id: 'BDI',
		value: 71
	},
	{
		name: 'Israel',
		id: 'ISR',
		value: 40
	},
	{
		name: 'Lebanon',
		id: 'LBN',
		value: 28
	},
	{
		name: 'Madagascar',
		id: 'MDG',
		value: 13
	},
	{
		name: 'Palestine',
		id: 'PSX',
		value: 26
	},
	{
		name: 'Gambia',
		id: 'GMB',
		value: 88
	},
	{
		name: 'Tunisia',
		id: 'TUN',
		value: 94
	},
	{
		name: 'Algeria',
		id: 'DZA',
		value: 95
	},
	{
		name: 'Jordan',
		id: 'JOR',
		value: 70
	},
	{
		name: 'United Arab Emirates',
		id: 'ARE',
		value: 67
	},
	{
		name: 'Qatar',
		id: 'QAT',
		value: 84
	},
	{
		name: 'Kuwait',
		id: 'KWT',
		value: 36
	},
	{
		name: 'Iraq',
		id: 'IRQ',
		value: 12
	},
	{
		name: 'Oman',
		id: 'OMN',
		value: 83
	},
	{
		name: 'Vanuatu',
		id: 'VUT',
		value: 53
	},
	{
		name: 'Cambodia',
		id: 'KHM',
		value: 92
	},
	{
		name: 'Thailand',
		id: 'THA',
		value: 1
	},
	{
		name: 'Laos',
		id: 'LAO',
		value: 87
	},
	{
		name: 'Myanmar',
		id: 'MMR',
		value: 85
	},
	{
		name: 'Vietnam',
		id: 'VNM',
		value: 40
	},
	{
		name: 'North Korea',
		id: 'PRK',
		value: 23
	},
	{
		name: 'South Korea',
		id: 'KOR',
		value: 28
	},
	{
		name: 'Mongolia',
		id: 'MNG',
		value: 24
	},
	{
		name: 'India',
		id: 'IND',
		value: 89
	},
	{
		name: 'Bangladesh',
		id: 'BGD',
		value: 71
	},
	{
		name: 'Bhutan',
		id: 'BTN',
		value: 11
	},
	{
		name: 'Nepal',
		id: 'NPL',
		value: 49
	},
	{
		name: 'Pakistan',
		id: 'PAK',
		value: 29
	},
	{
		name: 'Afghanistan',
		id: 'AFG',
		value: 88
	},
	{
		name: 'Tajikistan',
		id: 'TJK',
		value: 21
	},
	{
		name: 'Kyrgyzstan',
		id: 'KGZ',
		value: 15
	},
	{
		name: 'Turkmenistan',
		id: 'TKM',
		value: 76
	},
	{
		name: 'Iran',
		id: 'IRN',
		value: 23
	},
	{
		name: 'Syria',
		id: 'SYR',
		value: 67
	},
	{
		name: 'Armenia',
		id: 'ARM',
		value: 92
	},
	{
		name: 'Sweden',
		id: 'SWE',
		value: 51
	},
	{
		name: 'Belarus',
		id: 'BLR',
		value: 58
	},
	{
		name: 'Ukraine',
		id: 'UKR',
		value: 63
	},
	{
		name: 'Poland',
		id: 'POL',
		value: 70
	},
	{
		name: 'Austria',
		id: 'AUT',
		value: 59
	},
	{
		name: 'Hungary',
		id: 'HUN',
		value: 100
	},
	{
		name: 'Moldova',
		id: 'MDA',
		value: 88
	},
	{
		name: 'Romania',
		id: 'ROU',
		value: 42
	},
	{
		name: 'Lithuania',
		id: 'LTU',
		value: 31
	},
	{
		name: 'Latvia',
		id: 'LVA',
		value: 27
	},
	{
		name: 'Estonia',
		id: 'EST',
		value: 82
	},
	{
		name: 'Germany',
		id: 'DEU',
		value: 53
	},
	{
		name: 'Bulgaria',
		id: 'BGR',
		value: 1
	},
	{
		name: 'Greece',
		id: 'GRC',
		value: 1
	},
	{
		name: 'Turkey',
		id: 'TUR',
		value: 7
	},
	{
		name: 'Albania',
		id: 'ALB',
		value: 15
	},
	{
		name: 'Croatia',
		id: 'HRV',
		value: 40
	},
	{
		name: 'Switzerland',
		id: 'CHE',
		value: 88
	},
	{
		name: 'Luxembourg',
		id: 'LUX',
		value: 52
	},
	{
		name: 'Belgium',
		id: 'BEL',
		value: 80
	},
	{
		name: 'Netherlands',
		id: 'NLD',
		value: 80
	},
	{
		name: 'Portugal',
		id: 'PR1',
		value: 12
	},
	{
		name: 'Spain',
		id: 'ESP',
		value: 43
	},
	{
		name: 'Ireland',
		id: 'IRL',
		value: 6
	},
	{
		name: 'New Caledonia',
		id: 'NCL',
		value: 26
	},
	{
		name: 'Solomon Is.',
		id: 'SLB',
		value: 16
	},
	{
		name: 'New Zealand',
		id: 'NZL',
		value: 5
	},
	{
		name: 'Australia',
		id: 'AUS',
		value: 53
	},
	{
		name: 'Sri Lanka',
		id: 'LKA',
		value: 94
	},
	{
		name: 'China',
		id: 'CHN',
		value: 2
	},
	{
		name: 'Taiwan',
		id: 'TWN',
		value: 98
	},
	{
		name: 'Italy',
		id: 'ITA',
		value: 95
	},
	{
		name: 'Denmark',
		id: 'DNK',
		value: 32
	},
	{
		name: 'United Kingdom',
		id: 'GBR',
		value: 26
	},
	{
		name: 'Iceland',
		id: 'ISL',
		value: 98
	},
	{
		name: 'Azerbaijan',
		id: 'AZE',
		value: 79
	},
	{
		name: 'Georgia',
		id: 'GEO',
		value: 81
	},
	{
		name: 'Philippines',
		id: 'PHL',
		value: 15
	},
	{
		name: 'Malaysia',
		id: 'MYS',
		value: 44
	},
	{
		name: 'Brunei',
		id: 'BRN',
		value: 75
	},
	{
		name: 'Slovenia',
		id: 'SVN',
		value: 24
	},
	{
		name: 'Finland',
		id: 'FIN',
		value: 59
	},
	{
		name: 'Slovakia',
		id: 'SVK',
		value: 17
	},
	{
		name: 'Czechia',
		id: 'CZE',
		value: 20
	},
	{
		name: 'Eritrea',
		id: 'ERI',
		value: 36
	},
	{
		name: 'Japan',
		id: 'JPN',
		value: 95
	},
	{
		name: 'Paraguay',
		id: 'PRY',
		value: 64
	},
	{
		name: 'Yemen',
		id: 'YEM',
		value: 72
	},
	{
		name: 'Saudi Arabia',
		id: 'SAU',
		value: 90
	},
	{
		name: 'Antarctica',
		id: 'ATA',
		value: 30
	},
	{
		name: 'N. Cyprus',
		id: 'CYP',
		value: 32
	},
	{
		name: 'Cyprus',
		id: 'CYP',
		value: 20
	},
	{
		name: 'Morocco',
		id: 'MAR',
		value: 93
	},
	{
		name: 'Egypt',
		id: 'EGY',
		value: 15
	},
	{
		name: 'Libya',
		id: 'LBY',
		value: 77
	},
	{
		name: 'Ethiopia',
		id: 'ETH',
		value: 19
	},
	{
		name: 'Djibouti',
		id: 'DJI',
		value: 17
	},
	{
		name: 'Somaliland',
		id: 'SOM',
		value: 50
	},
	{
		name: 'Uganda',
		id: 'UGA',
		value: 16
	},
	{
		name: 'Rwanda',
		id: 'RWA',
		value: 46
	},
	{
		name: 'Bosnia and Herz.',
		id: 'BIH',
		value: 47
	},
	{
		name: 'North Macedonia',
		id: 'MKD',
		value: 50
	},
	{
		name: 'Serbia',
		id: 'SRB',
		value: 47
	},
	{
		name: 'Montenegro',
		id: 'MNE',
		value: 89
	},
	{
		name: 'Kosovo',
		id: 'SRB',
		value: 40
	},
	{
		name: 'Trinidad and Tobago',
		id: 'TTO',
		value: 97
	},
	{
		name: 'S. Sudan',
		id: 'SSD',
		value: 74
	}
]

const missingData: ChartTabularData = [
	{
		name: 'Fiji',
		id: 'FJI',
		value: 45
	},
	{
		name: 'Tanzania',
		id: 'TZA',
		value: 71
	},
	{
		name: 'W. Sahara',
		id: 'B28',
		value: 24
	},
	{
		name: 'Uzbekistan',
		id: 'UZB',
		value: 92
	},
	{
		name: 'Papua New Guinea',
		id: 'PN1',
		value: 29
	},
	{
		name: 'Indonesia',
		id: 'IDN',
		value: 95
	},
	{
		name: 'Kenya',
		id: 'KEN',
		value: 17
	},
	{
		name: 'Chad',
		id: 'TCD',
		value: 17
	},
	{
		name: 'Haiti',
		id: 'HTI',
		value: 21
	},
	{
		name: 'Dominican Rep.',
		id: 'DOM',
		value: 53
	},
	{
		name: 'Bahamas',
		id: 'BHS',
		value: 63
	},
	{
		name: 'Falkland Is.',
		id: 'B12',
		value: 75
	},
	{
		name: 'Greenland',
		id: 'GRL',
		value: 94
	},
	{
		name: 'Fr. S. Antarctic Lands',
		id: 'ATF',
		value: 90
	},
	{
		name: 'Timor-Leste',
		id: 'TLS',
		value: 91
	},
	{
		name: 'South Africa',
		id: 'ZAF',
		value: 46
	},
	{
		name: 'Lesotho',
		id: 'LSO',
		value: 36
	},
	{
		name: 'Mexico',
		id: 'MEX',
		value: 81
	},
	{
		name: 'Uruguay',
		id: 'URY',
		value: 53
	},
	{
		name: 'Brazil',
		id: 'BRA',
		value: 32
	},
	{
		name: 'Bolivia',
		id: 'BOL',
		value: 44
	},
	{
		name: 'Peru',
		id: 'PER',
		value: 41
	},
	{
		name: 'Colombia',
		id: 'COL',
		value: 11
	},
	{
		name: 'Panama',
		id: 'PAN',
		value: 30
	},
	{
		name: 'Costa Rica',
		id: 'CRI',
		value: 6
	},
	{
		name: 'Nicaragua',
		id: 'NIC',
		value: 96
	},
	{
		name: 'Honduras',
		id: 'HND',
		value: 20
	},
	{
		name: 'El Salvador',
		id: 'SLV',
		value: 31
	},
	{
		name: 'Guatemala',
		id: 'GTM',
		value: 71
	},
	{
		name: 'Belize',
		id: 'BLZ',
		value: 65
	},
	{
		name: 'Venezuela',
		id: 'VEN',
		value: 40
	},
	{
		name: 'Guyana',
		id: 'GUY',
		value: 66
	},
	{
		name: 'Suriname',
		id: 'SUR',
		value: 46
	},
	{
		name: 'France',
		id: 'FRA',
		value: 99
	},
	{
		name: 'Ecuador',
		id: 'ECU',
		value: 17
	},
	{
		name: 'Puerto Rico',
		id: 'PRI',
		value: 98
	},
	{
		name: 'Jamaica',
		id: 'JAM',
		value: 81
	},
	{
		name: 'Cuba',
		id: 'CUB',
		value: 50
	},
	{
		name: 'Zimbabwe',
		id: 'ZWE',
		value: 96
	},
	{
		name: 'Botswana',
		id: 'BWA',
		value: 81
	},
	{
		name: 'Namibia',
		id: 'NAM',
		value: 94
	},
	{
		name: 'Senegal',
		id: 'SEN',
		value: 15
	},
	{
		name: 'Mali',
		id: 'MLI',
		value: 47
	},
	{
		name: 'Mauritania',
		id: 'MRT',
		value: 92
	},
	{
		name: 'Benin',
		id: 'BEN',
		value: 13
	},
	{
		name: 'Niger',
		id: 'NER',
		value: 59
	},
	{
		name: 'Nigeria',
		id: 'NGA',
		value: 9
	},
	{
		name: 'Cameroon',
		id: 'CMR',
		value: 50
	},
	{
		name: 'Togo',
		id: 'TGO',
		value: 99
	},
	{
		name: 'Ghana',
		id: 'GHA',
		value: 35
	},
	{
		name: "Côte d'Ivoire",
		id: 'CIV',
		value: 18
	},
	{
		name: 'Guinea',
		id: 'GIN',
		value: 93
	},
	{
		name: 'Guinea-Bissau',
		id: 'GNB',
		value: 100
	},
	{
		name: 'Liberia',
		id: 'LBR',
		value: 55
	},
	{
		name: 'Sierra Leone',
		id: 'SLE',
		value: 17
	},
	{
		name: 'Burkina Faso',
		id: 'BFA',
		value: 41
	},
	{
		name: 'Gabon',
		id: 'GAB',
		value: 6
	},
	{
		name: 'Eq. Guinea',
		id: 'GNQ',
		value: 83
	},
	{
		name: 'Malawi',
		id: 'MWI',
		value: 70
	},
	{
		name: 'Mozambique',
		id: 'MOZ',
		value: 89
	},
	{
		name: 'eSwatini',
		id: 'SWZ',
		value: 57
	},
	{
		name: 'Angola',
		id: 'AGO',
		value: 63
	},
	{
		name: 'Burundi',
		id: 'BDI',
		value: 71
	},
	{
		name: 'Israel',
		id: 'ISR',
		value: 40
	},
	{
		name: 'Lebanon',
		id: 'LBN',
		value: 28
	},
	{
		name: 'Madagascar',
		id: 'MDG',
		value: 13
	},
	{
		name: 'Gambia',
		id: 'GMB',
		value: 88
	},
	{
		name: 'Tunisia',
		id: 'TUN',
		value: 94
	},
	{
		name: 'Algeria',
		id: 'DZA',
		value: 95
	},
	{
		name: 'Jordan',
		id: 'JOR',
		value: 70
	},
	{
		name: 'United Arab Emirates',
		id: 'ARE',
		value: 67
	},
	{
		name: 'Qatar',
		id: 'QAT',
		value: 84
	},
	{
		name: 'Kuwait',
		id: 'KWT',
		value: 36
	},
	{
		name: 'Iraq',
		id: 'IRQ',
		value: 12
	},
	{
		name: 'Oman',
		id: 'OMN',
		value: 83
	},
	{
		name: 'Vanuatu',
		id: 'VUT',
		value: 53
	},
	{
		name: 'Cambodia',
		id: 'KHM',
		value: 92
	},
	{
		name: 'Thailand',
		id: 'THA',
		value: 1
	},
	{
		name: 'Laos',
		id: 'LAO',
		value: 87
	},
	{
		name: 'Myanmar',
		id: 'MMR',
		value: 85
	},
	{
		name: 'Vietnam',
		id: 'VNM',
		value: 40
	},
	{
		name: 'North Korea',
		id: 'PRK',
		value: 23
	},
	{
		name: 'South Korea',
		id: 'KOR',
		value: 28
	},
	{
		name: 'Mongolia',
		id: 'MNG',
		value: 24
	},
	{
		name: 'India',
		id: 'IND',
		value: 89
	},
	{
		name: 'Bangladesh',
		id: 'BGD',
		value: 71
	},
	{
		name: 'Bhutan',
		id: 'BTN',
		value: 11
	},
	{
		name: 'Nepal',
		id: 'NPL',
		value: 49
	},
	{
		name: 'Pakistan',
		id: 'PAK',
		value: 29
	},
	{
		name: 'Afghanistan',
		id: 'AFG',
		value: 88
	},
	{
		name: 'Tajikistan',
		id: 'TJK',
		value: 21
	},
	{
		name: 'Kyrgyzstan',
		id: 'KGZ',
		value: 15
	},
	{
		name: 'Armenia',
		id: 'ARM',
		value: 92
	},
	{
		name: 'Sweden',
		id: 'SWE',
		value: 51
	},
	{
		name: 'Belarus',
		id: 'BLR',
		value: 58
	},
	{
		name: 'Ukraine',
		id: 'UKR',
		value: 63
	},
	{
		name: 'Poland',
		id: 'POL',
		value: 70
	},
	{
		name: 'Austria',
		id: 'AUT',
		value: 59
	},
	{
		name: 'Hungary',
		id: 'HUN',
		value: 100
	},
	{
		name: 'Moldova',
		id: 'MDA',
		value: 88
	},
	{
		name: 'Romania',
		id: 'ROU',
		value: 42
	},
	{
		name: 'Germany',
		id: 'DEU',
		value: 53
	},
	{
		name: 'Bulgaria',
		id: 'BGR',
		value: 1
	},
	{
		name: 'Greece',
		id: 'GRC',
		value: 1
	},
	{
		name: 'Turkey',
		id: 'TUR',
		value: 7
	},
	{
		name: 'Albania',
		id: 'ALB',
		value: 15
	},
	{
		name: 'Croatia',
		id: 'HRV',
		value: 40
	},
	{
		name: 'Switzerland',
		id: 'CHE',
		value: 88
	},
	{
		name: 'Luxembourg',
		id: 'LUX',
		value: 52
	},
	{
		name: 'Belgium',
		id: 'BEL',
		value: 80
	},
	{
		name: 'Netherlands',
		id: 'NLD',
		value: 80
	},
	{
		name: 'Portugal',
		id: 'PR1',
		value: 12
	},
	{
		name: 'Spain',
		id: 'ESP',
		value: 43
	},
	{
		name: 'Ireland',
		id: 'IRL',
		value: 6
	},
	{
		name: 'New Caledonia',
		id: 'NCL',
		value: 26
	},
	{
		name: 'Solomon Is.',
		id: 'SLB',
		value: 16
	},
	{
		name: 'New Zealand',
		id: 'NZL',
		value: 5
	},
	{
		name: 'Australia',
		id: 'AUS',
		value: 53
	},
	{
		name: 'Sri Lanka',
		id: 'LKA',
		value: 94
	},
	{
		name: 'China',
		id: 'CHN',
		value: 2
	},
	{
		name: 'Taiwan',
		id: 'TWN',
		value: 98
	},
	{
		name: 'Italy',
		id: 'ITA',
		value: 95
	},
	{
		name: 'Denmark',
		id: 'DNK',
		value: 32
	},
	{
		name: 'United Kingdom',
		id: 'GBR',
		value: 26
	},
	{
		name: 'Iceland',
		id: 'ISL',
		value: 98
	},
	{
		name: 'Azerbaijan',
		id: 'AZE',
		value: 79
	},
	{
		name: 'Georgia',
		id: 'GEO',
		value: 81
	},
	{
		name: 'Philippines',
		id: 'PHL',
		value: 15
	},
	{
		name: 'Malaysia',
		id: 'MYS',
		value: 44
	},
	{
		name: 'Brunei',
		id: 'BRN',
		value: 75
	},
	{
		name: 'Slovenia',
		id: 'SVN',
		value: 24
	},
	{
		name: 'Finland',
		id: 'FIN',
		value: 59
	},
	{
		name: 'Slovakia',
		id: 'SVK',
		value: 17
	},
	{
		name: 'Czechia',
		id: 'CZE',
		value: 20
	},
	{
		name: 'Eritrea',
		id: 'ERI',
		value: 36
	},
	{
		name: 'Japan',
		id: 'JPN',
		value: 95
	},
	{
		name: 'Paraguay',
		id: 'PRY',
		value: 64
	},
	{
		name: 'Yemen',
		id: 'YEM',
		value: 72
	},
	{
		name: 'Saudi Arabia',
		id: 'SAU',
		value: 90
	},
	{
		name: 'Antarctica',
		id: 'ATA',
		value: 30
	},
	{
		name: 'N. Cyprus',
		id: 'CYP',
		value: 32
	},
	{
		name: 'Cyprus',
		id: 'CYP',
		value: 20
	},
	{
		name: 'Morocco',
		id: 'MAR',
		value: 93
	},
	{
		name: 'Egypt',
		id: 'EGY',
		value: 15
	},
	{
		name: 'Libya',
		id: 'LBY',
		value: 77
	},
	{
		name: 'Ethiopia',
		id: 'ETH',
		value: 19
	},
	{
		name: 'Djibouti',
		id: 'DJI',
		value: 17
	},
	{
		name: 'Somaliland',
		id: 'SOM',
		value: 50
	},
	{
		name: 'Uganda',
		id: 'UGA',
		value: 16
	},
	{
		name: 'Rwanda',
		id: 'RWA',
		value: 46
	},
	{
		name: 'Bosnia and Herz.',
		id: 'BIH',
		value: 47
	},
	{
		name: 'North Macedonia',
		id: 'MKD',
		value: 50
	},
	{
		name: 'Serbia',
		id: 'SRB',
		value: 47
	},
	{
		name: 'Montenegro',
		id: 'MNE',
		value: 89
	},
	{
		name: 'Kosovo',
		id: 'SRB',
		value: 40
	},
	{
		name: 'Trinidad and Tobago',
		id: 'TTO',
		value: 97
	}
]

export const examples: Example[] = [
	{
		options,
		data,
		tags: ['test']
	},
	{
		options: missingDataOptions,
		data: missingData,
		tags: ['test']
	},
	{
		options: customColorsOptions,
		data,
		tags: ['test']
	}
]
