{ mkYarnPackage }:
mkYarnPackage {
  name = "s3-power";
  src = ./.;
  packageJSON = ./package.json;
  yarnLock = ./yarn.lock;
  yarnNix = ./yarn.nix;
}
