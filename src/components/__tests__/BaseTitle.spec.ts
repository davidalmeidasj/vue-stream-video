import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseTitle from '../BaseTitle.vue';

describe('BaseTitle.vue', () => {
  it('renders the slot content', () => {
    const wrapper = mount(BaseTitle, {
      slots: {
        default: 'Meu título personalizado',
      },
    });

    expect(wrapper.text()).toBe('Meu título personalizado');
  });

  it('renders an <h1> with expected classes', () => {
    const wrapper = mount(BaseTitle);

    const h1 = wrapper.find('h1');

    expect(h1.exists()).toBe(true);
    expect(h1.classes()).toContain('text-h4');
    expect(h1.classes()).toContain('font-weight-medium');
    expect(h1.classes()).toContain('text-center');
    expect(h1.classes()).toContain('mb-4');
  });

});
