export default class News {
	private element: HTMLAnchorElement | null;
	constructor() {
		this.element = document.getElementById("news") as HTMLAnchorElement;
	}
	updateContent(newText: string): void {
		if (this.element) {
			this.element.style.animation = "hide_news 0.5s ease-in-out";
			setTimeout((): void => {
				if (this.element) {
					this.element.textContent = newText;
					this.element.style.animation = "show_news 0.5s ease-in-out";
				}
			}, 500);
		} else {
			console.error(`Anchor element with ID "news" not found.`);
		}
	}
	updateLink(newLink: string): void {
		if (this.element) {
			this.element.href = newLink;
		} else {
			console.error(`Anchor element with ID "news" not found.`);
		}
	}
	update(newText: string, newLink: string): void {
		this.updateContent(newText);
		this.updateLink(newLink);
	}
}