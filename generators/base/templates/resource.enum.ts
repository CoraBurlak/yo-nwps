export const enum <%= moduleNameNoDash %>Resource {
	<%= moduleNameCapsUnder %>_PAGE_DETAIL_VIEW = 'internal/<%= moduleNameNoDash %>Pages/:pageId/<%= moduleNameNoDash %>Details/:<%= moduleNameCamel %>Id',
	<%= moduleNameCapsUnder %>_GENERAL = 'internal/<%= moduleNameNoDash %>s/:<%= moduleNameCamel %>Id/General',
	<%= moduleNameCapsUnder %>_SAVE = 'internal/<%= moduleNameNoDash %>s',
	<%= moduleNameCapsUnder %>_DELETE = 'internal/<%= moduleNameNoDash %>s/:<%= moduleNameCamel %>Id',
}
