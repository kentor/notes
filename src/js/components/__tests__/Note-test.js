import Note from '../Note';
import NoteModel from '../../models/Note';
import React from 'react';
import Enzyme, { mount } from 'enzyme';

function shallow(element) {
  return Enzyme.shallow(element, { disableLifecycleMethods: true });
}

describe('Note Component', () => {
  describe('#shouldShowContent', () => {
    it('returns false if localHidden is true', () => {
      const note = new NoteModel();
      const wrapper = shallow(<Note note={note} localHidden={true} />);
      expect(wrapper.instance().shouldShowContent()).toBe(false);
    });

    it('returns true if localHidden is false and note hidden is true', () => {
      const note = new NoteModel({ hidden: true });
      let wrapper;
      wrapper = shallow(<Note note={note} />);
      expect(wrapper.instance().shouldShowContent()).toBe(false);
      wrapper = shallow(<Note note={note} localHidden={false} />);
      expect(wrapper.instance().shouldShowContent()).toBe(true);
    });
  });

  describe('with markdown', () => {
    it('render links', () => {
      const note = new NoteModel({ content: 'http://kentor.me/' });
      const wrapper = shallow(<Note note={note} />);
      expect(wrapper.html()).toContain('<a href="http://kentor.me/">');
    });

    it('escapes html', () => {
      const note = new NoteModel({ content: '<script></script>' });
      const wrapper = shallow(<Note note={note} />);
      expect(wrapper.html()).toContain('&lt;script&gt;&lt;/script&gt;');
    });

    it('inserts line breaks', () => {
      const note = new NoteModel({ content: '犬\n猫' });
      const wrapper = shallow(<Note note={note} />);
      expect(wrapper.html()).toContain('犬<br>猫');
    });
  });

  it('renders relative time ago', () => {
    let note;
    let wrapper;

    note = new NoteModel({ createdAt: new Date() - 1000 });
    wrapper = mount(<Note note={note} />);
    expect(wrapper.text()).toMatch(/1 second/);

    note = new NoteModel({ createdAt: new Date() - 2000 * 60 });
    wrapper = mount(<Note note={note} />);
    expect(wrapper.text()).toMatch(/2 minutes/);
  });

  it('does not call onToggleLocalHidden when window has a selection', () => {
    const note = new NoteModel();
    const spy = jest.fn();
    const wrapper = mount(<Note note={note} onToggleLocalHidden={spy} />);

    window.getSelection = () => '';
    wrapper.instance().toggleLocalHidden();
    expect(spy).toHaveBeenCalledTimes(1);

    window.getSelection = () => 'something';
    wrapper.instance().toggleLocalHidden();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('handles toggleHidden and destroy correctly', () => {
    const note = new NoteModel();
    const destroySpy = jest.fn();
    const toggleHiddenSpy = jest.fn();
    const toggleLocalHiddenSpy = jest.fn();
    const wrapper = mount(
      <Note
        note={note}
        onDestroy={destroySpy}
        onToggleHidden={toggleHiddenSpy}
        onToggleLocalHidden={toggleLocalHiddenSpy}
      />
    );
    const instance = wrapper.instance();
    wrapper.find({ onClick: instance.destroy }).first().simulate('click');
    wrapper.find({ onClick: instance.toggleHidden }).first().simulate('click');
    expect(destroySpy).toHaveBeenCalledTimes(1);
    expect(toggleHiddenSpy).toHaveBeenCalledTimes(1);
    expect(toggleLocalHiddenSpy).toHaveBeenCalledTimes(0);
  });
});
