<script>
  import { fade } from 'svelte/transition';

  import QuestionMark from '../Icons/QuestionMark.svelte';
  import '../../index.css';

  let city = '';

  let visible = false;
  const handleFocus = () => {
    visible = true;
  };
  const handleBlur = () => {
    visible = false;
  };
  window.addEventListener('scroll', function () {
    visible = false;
  });
</script>

<div class="w-64 mx-auto text-right h-96">
  <div class="relative inline-block text-left">
    <label for="account_number" class="block text-sm font-medium text-gray-700"
      >Account number</label
    >
    <div class="mt-1 relative rounded-md shadow-sm">
      <input
        on:focus={handleFocus}
        on:blur={handleBlur}
        bind:value={city}
        type="text"
        name="account_number"
        id="account_number"
        class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
        placeholder="000-00-0000"
      />
      <div
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none cursor-pointer"
      >
        <QuestionMark />
      </div>
    </div>
    {#if visible}
      <div
        transition:fade={{ duration: 200 }}
        class="origin-top-right absolute z-50 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div class="py-1" role="none">
          <a
            href="#"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem">Account settings</a
          >
          <a
            href="#"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem">Support</a
          >
          <a
            href="#"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem">License</a
          >
          <form method="POST" action="#" role="none">
            <button
              type="submit"
              class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    {/if}
  </div>
</div>
