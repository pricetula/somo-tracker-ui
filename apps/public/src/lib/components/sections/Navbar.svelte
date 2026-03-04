<script lang="ts">
  import { Button } from "$lib/components/ui/button";
</script>

<nav class="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
  <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
    <a href="/" class="text-xl font-bold text-primary tracking-tight">
      Somo<span class="text-foreground">tracker</span>
    </a>
    <Button variant="ghost" size="sm" href="/login">Sign In</Button>
  </div>
</nav>
