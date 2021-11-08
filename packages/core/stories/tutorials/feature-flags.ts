import marked from 'marked';

export const featureFlagTutorial = {
	name: 'Style feature flags',
	content: marked(`
# Style feature flags

Carbon charts uses carbon components for styling. In order to prevent fonts from loading twice, user's can reduce build times by disabling font importing.

\`\`\`scss
$chart-feature-flags: (
	enable-font-imports: false,
);
\`\`\`

By default, enable-font-imports is set to true.
`),
};
