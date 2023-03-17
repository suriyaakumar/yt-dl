// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	/* config options here */
	typescript: {
		ignoreBuildErrors: false,
		tsconfigPath: './tsconfig.json',
	},
	eslint: {
		ignoreDuringBuilds: false,
		dirs: ['src'],
	},
};

module.exports = nextConfig;
