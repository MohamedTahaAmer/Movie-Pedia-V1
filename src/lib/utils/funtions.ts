export function isUUID(input: string): boolean {
	// this will be used to check the id we get from the url is UUID before using it to query the db
	const uuidPattern =
		/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
	return uuidPattern.test(input);
}