<script lang="ts">
  import { inView } from "$lib/actions/intersectionObserver";
  let visible = $state(false);
</script>

<footer
  class="py-8 px-4 border-t border-border footer-wrap"
  class:visible
  use:inView
  onenter={() => { visible = true; }}
>
  <div
    class="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground"
  >
    <p>© 2026 Somotracker. All rights reserved.</p>
    <div class="flex gap-6">
      <a href="/privacy" class="hover:text-foreground transition-colors">Privacy</a>
      <a href="/terms" class="hover:text-foreground transition-colors">Terms</a>
      <a href="mailto:hello@somotracker.com" class="hover:text-foreground transition-colors">Contact</a>
    </div>
  </div>
</footer>

<style>
  .footer-wrap {
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .footer-wrap.visible {
    opacity: 1;
    transform: translateY(0);
  }
</style>
