import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Main documentation sidebar
  tutorialSidebar: [
    'intro',
    'architecture',
    'getting-started',
    {
      type: 'category',
      label: 'Project Structure',
      items: [
        'project-structure/overview',
      ],
    },
    {
      type: 'category',
      label: 'Development',
      items: [
        'development/setup',
      ],
    },
    'contributing',
    'troubleshooting',
  ],

  // API Reference sidebar
  apiSidebar: [
    'api/overview',
    'api/repositories',
  ],

  // Components sidebar
  componentsSidebar: [
    'components/overview',
    'components/repository-components',
    'components/ui-components',
    'components/state-management',
  ],
};

export default sidebars;
