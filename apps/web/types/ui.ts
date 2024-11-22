export interface BannerProps {
  isOpen: boolean;
  closeWalletSelection: () => void;
}

export interface NavbarProps {
  toggleWalletSelection: () => void;
}

export interface WalletSelectionProps {
  closeWalletSelection: () => void;
}
