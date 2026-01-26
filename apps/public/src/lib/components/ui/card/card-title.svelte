<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		class?: string | undefined | null;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = undefined, children, ...rest }: Props = $props();
	
</script>

<h3
	class={cn('text-2xl font-semibold leading-none tracking-tight', className)}
	{...rest}
>
	{@render children?.()}
</h3>
