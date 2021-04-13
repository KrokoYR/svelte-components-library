<script>
  import '../../index.css';
  import { fade } from 'svelte/transition';

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

<!-- This example requires Tailwind CSS v2.0+ -->
<div class="w-64 mx-auto text-right h-96">
  <div class="relative inline-block text-left">
    <label for="account_number" class="block text-sm font-medium text-gray-700"
      >Account number</label
    >
    <div class="mt-1 relative rounded-md shadow-sm">
      <input
        on:focus={handleFocus}
        on:blur={handleBlur}
        type="text"
        name="account_number"
        id="account_number"
        class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
        placeholder="000-00-0000"
      />
      <div
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none cursor-pointer"
      >
        <!-- Heroicon name: solid/question-mark-circle -->
        <svg
          class="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>

    <!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  -->
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
