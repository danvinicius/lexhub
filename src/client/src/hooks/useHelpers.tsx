interface UseHelpersReturn {
    slugify: (str: string) => string;
    getRawText: (str: string) => string;
}

export const useHelpers = (): UseHelpersReturn => {
	const slugify = (str: string) => {
		str = str.trim();
		str = str.toLowerCase();
		str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
		str = str
			.replace(/[^a-z0-9 -]/g, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-');

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
