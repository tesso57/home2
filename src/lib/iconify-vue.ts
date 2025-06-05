import { defineComponent, h } from "vue";
import "iconify-icon";

export interface IconProps {
	icon: string;
	width?: string | number;
	height?: string | number;
}

export const Icon = defineComponent({
	name: "Icon",
	props: {
		icon: { type: String, required: true },
		width: [Number, String],
		height: [Number, String],
	},
	setup(props, { attrs }) {
		return () =>
			h("iconify-icon", {
				...attrs,
				icon: props.icon,
				width: props.width,
				height: props.height,
			});
	},
});

export default Icon;
