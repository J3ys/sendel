cask "stfu" do
  version "2026.04.01"
  sha256 "357621e9b970baa1012bef9365ad4cffad909a79290ed6a184dd6dff6c84889c"

  url "https://github.com/J3ys/sendel/releases/download/v#{version}/STFU.dmg"
  name "STFU"
  desc "STFU macOS application"
  homepage "https://sendel.org"

  app "STFU.app"
end
