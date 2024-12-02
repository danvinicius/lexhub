interface UseHelpersReturn {
    slugify: (str: string) => string;
    getRawText: (str: string) => string;
}

export const useHelpers = (): UseHelpersReturn => {
	const slugify = (str: string) => {
		str = str.trim(); // trim leading/trailing white space
		str = str.toLowerCase(); // convert string to lowercase
		str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
		str = str
			.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
			.replace(/\s+/g, '-') // replace spaces with hyphens
			.replace(/-+/g, '-'); // remove consecutive hyphens

		return str;
	};

	const getRawText = (html: string): string => {
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = html;
		return tempDiv.textContent || tempDiv.innerText || '';
	};
	

	return {
		slugify,
		getRawText,
	};
};
