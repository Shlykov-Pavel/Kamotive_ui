declare module 'pell' {
	interface PellAction {
	  name: string;
	  icon: string;
	  title: string;
	  result: () => void;
	}
  
	interface PellOptions {
	  element: HTMLElement;
	  onChange: (html: string) => void;
	  defaultParagraphSeparator?: string;
	  actions?: Array<string | PellAction>;
	  classes?: {
		actionbar?: string;
		button?: string;
		content?: string;
		selected?: string;
	  };
	}
  
	interface PellEditor {
	  content: HTMLElement;
	}
  
	export function init(options: PellOptions): PellEditor;
	export function exec(command: string, value?: string): void;
  }
  